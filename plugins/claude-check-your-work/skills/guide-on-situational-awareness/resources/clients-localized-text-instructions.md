# How to trace localized text through the codebase

Best Practices:
- Always include quotes when searching for specific strings/keys
- Use glob patterns to filter file types (`**/messages.json`, `**/*.ts`)

See [localized-text](../examples/clients-localized-text.md) for an example of this process.

## Step 1: Search for Localized Strings

**If you have user-visible text** (like a button label or menu item):

1. Search for the **exact text** in `messages.json` files
2. **Include the double quotes** in your search for exact matches
3. Use Grep with glob pattern: `**/messages.json`

### Example: Searching for "Auto-fill login"

Grepping "Auto-fill login" with glob "**/messages.json" will find entries like:

```json
"autoFillLogin": {
  "message": "Auto-fill login"
}
```

The localization key is `autoFillLogin`.

## Step 2: Search for the Localization Key

1. **Include quotes** in your search: `"autoFillLogin"`
2. Filter out the locale file results - look for the actual usage in TypeScript/JavaScript files
3. Common pattern: `this.i18nService.t("autoFillLogin")`

## Step 3: Trace the Key Through the Code

Once you have the localization key, trace its usage through TypeScript files to determine the full data flow — what structure it belongs to, where that structure is consumed, and whether the data flows beyond the current file.
