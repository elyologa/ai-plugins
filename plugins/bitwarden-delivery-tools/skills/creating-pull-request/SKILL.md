---
name: creating-pull-request
description: Pull request creation workflow for Bitwarden repositories. Use when creating PRs, writing PR descriptions, or preparing branches for review. Triggered by "create PR", "pull request", "open PR", "gh pr create", "PR description".
---

# Create Pull Request

## PR Title Format

```
[PM-XXXXX] <type>: <short imperative summary>
```

**Examples:**
- `[PM-12345] feat: Add autofill support for passkeys`
- `[PM-12345] fix: Resolve crash during vault sync`
- `[PM-12345] refactor: Simplify authentication flow`

**Rules:**
- Include Jira ticket prefix
- Keep under 70 characters total
- Use imperative mood in the summary

**Type keywords** (triggers automatic `t:` label via CI):

**Use the `labeling-changes` skill** (invoke via the Skill tool) for the full type keyword table and selection guidance.

---

## PR Body Template

**IMPORTANT:** Always follow the repo's PR template at `.github/PULL_REQUEST_TEMPLATE.md`. If no template exists, use this structure:

```markdown
## Type of change
<!-- feat / fix / refactor / chore / etc. -->

## Objective
<!-- What does this PR accomplish? Link Jira ticket. -->

## Code changes
<!-- Bullet list of key changes. -->

## Before you submit
- [ ] Tests added/updated
- [ ] Lint/format passing
- [ ] Self-reviewed changes
```

Delete the Screenshots section entirely if there are no UI changes.

---

## Pre-PR Checklist

1. **All tests pass** — consult CLAUDE.md or the repo's build/test skill for the correct test commands
2. **Lint clean** — consult CLAUDE.md for the repo's lint command
3. **Self-review done** — use the `perform-preflight` skill
4. **No unintended changes**: Check `git diff origin/main...HEAD` for unexpected files
5. **Branch up to date**: Rebase on `main` if needed

---

## Creating the PR

```bash
# Ensure branch is pushed
git push -u origin <branch-name>

# Create PR as draft by default (body follows .github/PULL_REQUEST_TEMPLATE.md)
gh pr create --draft --title "[PM-XXXXX] feat: Short summary" --body "<fill in from PR template>"
```

**Default to draft PRs.** Only create a non-draft (ready for review) PR if the user explicitly requests it.

---

## AI Review Label

Before running `gh pr create`, **always** use the `AskUserQuestion` tool to ask whether to add an AI review label:

- **Question**: "Would you like to add an AI review label to this PR?"
- **Options**: `ai-review-vnext`, `ai-review`, `No label`

If the user selects a label, include it via the `--label` flag:

```bash
gh pr create --draft --label "ai-review-vnext" --title "..." --body "..."
```

---

## Base Branch

- Default target: `main`
- Check with team if targeting a feature branch instead
