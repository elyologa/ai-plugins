---
name: guide-on-situational-awareness
description: Navigate unfamiliar code by tracing data flow, message passing, localized text, and recurring patterns. Use this skill to identify the scope of your work before you start. Do not assume you know—know you know.
user-invocable: false
---

# Situational Awareness

## Methodology

### Exploring the Local Environment

To systematically explore the code immediately surrounding a change — identifying patterns, understanding mechanisms, and tracing local data flow — use the [local environment instructions](./resources/local-environment-instructions.md).

### Tracing Localized Text

To trace localized strings through the Bitwarden `clients` repository (e.g., finding where a user-visible label is defined and how its key flows through code), use the [localized text instructions](./resources/clients-localized-text-instructions.md).

### Tracing Message Passing

To trace messages through the browser extension's messaging system, use the [message passing instructions](./resources/clients-message-passing-instructions.md). Reach for this when you encounter:

- A `sendExtensionMessage()` call (content script → service worker)
- A `BrowserApi.tabSendMessage()` call (service worker → content script)
- A `chrome.runtime.sendMessage()` call (broadcast)
- A `BrowserApi.messageListener()` registration
- A `chrome.runtime.onMessage.addListener()` registration
- An `extensionMessageHandlers` or similar handler map on a class

## Key Patterns to Look For

### Pattern Categories

1. **Conditional Flags** - Durable architectural controls that gate behavior across the application. Changes near these flags often have broader reach than the immediate code suggests.
   - Example: `requiresUnblockedUri`, `requiresPremiumAccess`

2. **Component Checks** - Centralized policy enforcement that multiple features depend on. Modifying these components can silently affect consumers you haven't traced yet.
   - Example: `RestrictedItemPolicy`, `DomainSettingsService`

3. **Event-driven Updates** - The coordination layer that keeps state consistent across components. When you see listeners, subscriptions, or handler registrations, consider whether the [message passing instructions](./resources/clients-message-passing-instructions.md) are needed to trace the full data flow.
   - Example: Tab changes, vault unlock, sync completion

4. **Utility Functions** - Shared logic that many callers assume behaves a certain way. Changes here propagate silently to every call site.
   - Example: `isUrlInList()`, `Utils.getHostname()`

## Tips for Effective Surveying

1. **Watch for naming inconsistencies** - URL vs URI, blocked vs excluded, etc. The same concept may use different names across the codebase.
2. **Private members may not be private** - If a class registers a message listener, check whether private members are accessed through the handler. Data may flow through message passing even when the member appears encapsulated.
3. **Name what's NOT relevant** - If you can't articulate why something is irrelevant, your model of the system isn't sharp enough yet. Explicitly test your comprehension using exclusions.
