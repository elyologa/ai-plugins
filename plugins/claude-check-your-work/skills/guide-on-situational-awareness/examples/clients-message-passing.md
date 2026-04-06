# Example: Tracing the `collectPageDetails` Message Lifecycle

**Context:** Understanding how autofill page details are collected, routed, and stored in the browser extension.

**Steps:**

1. **Identify the message:**
   - Starting point: `autofill-init.ts` sends `"bgCollectPageDetails"` with `sender: "autofillInit"` after a 750ms delay on page load
   - Command to trace: `bgCollectPageDetails`

2. **Find all senders:**
   - `apps/browser/src/autofill/content/autofill-init.ts` — content script, on page load (sender: `"autofillInit"`)
   - `apps/browser/src/autofill/services/autofill-overlay-content.service.ts` — content script, on field focus events

3. **Find all receivers:**
   - `apps/browser/src/background/runtime.background.ts` — service worker, via `processMessageWithSender()`
   - This is the only receiver for `bgCollectPageDetails`. It calls `main.collectPageDetailsForContentScript()`, which sends a _new_ message back to the content script: `"collectPageDetails"`

4. **Trace the second hop (background → content script):**
   - `main.collectPageDetailsForContentScript()` sends `"collectPageDetails"` to the originating tab via `BrowserApi.tabSendMessage()`
   - Received by `AutofillInit.extensionMessageHandlers["collectPageDetails"]` in the content script
   - Content script calls `collectAutofillContentService.getPageDetails()` — walks the DOM, catalogs all forms and fields
   - Content script sends _another_ message back: `"collectPageDetailsResponse"` with the page details and the original `sender` value

5. **Find all receivers of the response — this is where it gets interesting:**
   - `apps/browser/src/background/runtime.background.ts` — routes based on `message.sender`:
     - `"autofiller"` → triggers immediate autofill
     - `"contextMenu"` → buffers details, fills after 300ms
     - `ExtensionCommand.*` → triggers keyboard-shortcut-initiated autofill
     - `"autofillInit"` → **not handled here** (falls through)
   - `apps/browser/src/autofill/background/overlay.background.ts` — **independently** receives the same message via its own `BrowserApi.messageListener` registration, calls `storePageDetails()` regardless of sender

6. **Assess API surfaces of overlay.background.ts:**
   - **Typed interface** (`OverlayBackground`): 3 methods — `init()`, `removePageDetails(tabId)`, `updateOverlayCiphers()`
   - **Message handler map** (`extensionMessageHandlers`): 30+ handlers including `collectPageDetailsResponse`, `checkIsFieldCurrentlyFocused`, `getAutofillInlineMenuPosition`, etc.
   - The typed interface is for same-process callers (other service worker code). The message handler map is for cross-context callers (content scripts, popup).
   - `pageDetailsForTab` is a private member, but it is populated _through_ a message handler and its data is served _through_ other message handlers. It is not fully encapsulated in the way a typical private member would be.

**Key discovery:** The `"autofillInit"` sender path is only consumed by the overlay background (via broadcast). `runtime.background.ts` sees the message but has no case for that sender. This means the overlay background is the sole destination for the initial page-load collection — making it the authority on "what fields exist on this tab."
