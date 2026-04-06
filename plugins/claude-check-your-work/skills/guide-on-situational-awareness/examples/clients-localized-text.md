# Example: Tracing "Auto-fill login" Context Menu Item

**Context:** Investigating where the "Auto-fill login" menu item appears in the browser extension.

**Steps:**

1. **Step 1 — Search localized string:**
   - Pattern: `"Auto-fill login"` in `**/messages.json`
   - Found key: `autoFillLogin`

2. **Step 2 — Search localization key:**
   - Pattern: `"autoFillLogin"` in codebase
   - Found: `apps/browser/src/autofill/browser/main-context-menu-handler.ts:43`
   - Usage: `title: this.i18nService.t("autoFillLogin")`

3. **Step 3 — Trace the key through the code:**
   - Key is part of `private initContextMenuItems: InitContextMenuItems[]` array
   - Search for `initContextMenuItems` in the file
   - Found 3 usages:
     - Line 35: Definition
     - Line 190: For loop in initialization logic
     - Line 370: For loop in `removeBlockedUriMenuItems()`
   - Data consumed in local for loops, not passed to other services
   - **Trace complete** — `main-context-menu-handler.ts` is where this menu item is fully managed
