# How to trace message passing through the codebase

Best Practices:

- Always search for **all** receivers of a message, not just the first one you find
- When you find a message handler map, treat it as an API surface — not just implementation detail

See [message-passing](../examples/clients-message-passing.md) for an example of this process.

## When to Use This

Use this methodology when you encounter:

- A `sendExtensionMessage()` call (content script → service worker)
- A `BrowserApi.tabSendMessage()` call (service worker → content script)
- A `chrome.runtime.sendMessage()` call (broadcast)
- A `BrowserApi.messageListener()` registration
- A `chrome.runtime.onMessage.addListener()` registration
- An `extensionMessageHandlers` or similar handler map on a class

## Step 1: Identify the Message

Find the command string being sent. Messages in this codebase are identified by a `command` field.

```bash
# Example: You see this in a content script
sendExtensionMessage("bgCollectPageDetails", { sender: "autofillInit" })
```

The command is `bgCollectPageDetails`. Additional properties (like `sender`) may affect routing downstream.

## Step 2: Find All Senders

Search for the command string across the codebase. Note which context each sender runs in:

- **Content scripts** send via `sendExtensionMessage()` or `chrome.runtime.sendMessage()`
- **Service worker** sends to content scripts via `BrowserApi.tabSendMessage()`
- **Popup/options pages** send via `BrowserApi.sendMessage()`

Multiple components may send the same command for different reasons. The `sender` field often distinguishes them.

## Step 3: Find All Receivers

This is the most critical step and the one most likely to be incomplete.

Search for:

1. `BrowserApi.messageListener()` registrations — these subscribe to `chrome.runtime.onMessage`
2. `chrome.runtime.onMessage.addListener()` — direct listener registration
3. Handler maps (e.g., `extensionMessageHandlers`) that include the command as a key

**Multiple listeners can receive the same broadcast message.** When a content script sends `chrome.runtime.sendMessage()`, every `onMessage` listener in the service worker receives it. If both `runtime.background.ts` and `overlay.background.ts` register listeners, both receive the message independently.

## Step 4: Trace Routing Within Each Receiver

Messages are often routed based on runtime values, not just the command string. Common routing patterns:

- **Command-based dispatch**: A handler map keyed by `message.command`
- **Sender-based dispatch**: A switch/case or if/else on `message.sender` (e.g., `"contextMenu"`, `"autofillInit"`, `"autofiller"`)
- **Conditional handling**: Some receivers check the command but only act under certain conditions

For each receiver, trace what happens for each relevant sender value.

## Step 5: Identify Endpoints

At each terminal point, determine what the receiver does:

- **Stores data?** Where? In what structure? Who can access it later?
- **Triggers side effects?** UI updates, further messages, state changes?
- **Sends a response?** If the handler returns a value and the listener calls `sendResponse()`, this handler is a **query API** — other contexts can request data from it.
- **Sends a new message?** The trace may need to continue through a second message hop.

## Step 6: Assess API Surfaces

Components expose two independent API surfaces: a **typed interface** for same-process callers and a **message handler map** for cross-context callers. A component with a 3-method typed interface may have 20+ message handlers. Both are real — don't mistake the typed interface for the full surface area.

**Important:** `chrome.runtime.sendMessage` does not deliver messages to the sender's own context. Service worker code cannot message itself — it uses direct method calls. The message handler API is for cross-context consumers (content scripts, popup).
