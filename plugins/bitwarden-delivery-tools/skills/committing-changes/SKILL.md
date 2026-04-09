---
name: committing-changes
description: Git commit conventions and workflow for Bitwarden repositories. Use when committing code, writing commit messages, or preparing changes for commit. Triggered by "commit", "git commit", "commit message", "prepare commit", "stage changes".
---

# Git Commit Conventions

## Commit Message Format

```
[PM-XXXXX] <type>: <imperative summary>

<optional body explaining why, not what>
```

### Rules

1. **Ticket prefix**: Always include `[PM-XXXXX]` matching the Jira ticket
2. **Type keyword**: Include a conventional commit type after the ticket prefix — **use the `labeling-changes` skill** (invoke via the Skill tool) for the full type keyword table and selection guidance
3. **Imperative mood**: "Add feature" not "Added feature" or "Adds feature"
4. **Short summary**: Under 72 characters for the first line
5. **Body**: Explain the "why" not the "what" — the diff shows the what

### Example

```
[PM-12345] feat: Add biometric unlock timeout configuration

Users reported confusion about when biometric prompts appear.
This adds a configurable timeout setting to the security preferences.
```

### Followup Commits

Only the first commit on a branch needs the full format (ticket prefix, type keyword, body). Subsequent commits — whether addressing review feedback, making intermediate changes, or iterating locally — can use a short, descriptive summary with no prefix or body required.

```
Update error handling in login flow
```

---

## Pre-Commit Checklist

Consult the repo's CLAUDE.md for platform-specific build and lint commands. At minimum, before staging and committing:

1. **Run affected tests** — use the repo's build/test skill if available
2. **Check lint** — run the repo's linter on changed files
3. **Review staged changes**: `git diff --staged` — verify no unintended modifications
4. **Verify no secrets**: No API keys, tokens, passwords, or `.env` files staged
5. **Verify no generated files**: No build outputs, IDE-specific changes, or generated code

---

## What NOT to Commit

- `.env` files or config files with real tokens/credentials
- Signing keys or keystores
- Build outputs (platform-specific — check `.gitignore`)
- IDE-specific files (`.idea/` changes, `*.iml`, `.xcuserdata/`, etc.)
- Large binary files

---

## Staging Best Practices

- **Stage specific files** by name rather than `git add -A` or `git add .`
- Put each file path on its own line for readability:
  ```bash
  git add \
    path/to/first/File \
    path/to/second/File
  ```
- Review each file being staged to avoid accidentally including sensitive data
- Use `git status` (without `-uall` flag) to see the working tree state
