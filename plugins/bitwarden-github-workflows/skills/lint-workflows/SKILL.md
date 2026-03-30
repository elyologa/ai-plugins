---
name: lint-workflows
description: Lint github workflows and fix any error that was detected by bwwl linter.
---

# Workflow Linting Instructions

When this skill is invoked, execute the following steps to lint GitHub Actions workflows using the bwwl (Bitwarden Workflow Linter) and fix any detected errors.

## Overview

BWWL is Bitwarden's custom workflow linter for GitHub Actions that:
- Enforces 10 built-in rules (naming, pinned versions, permissions, approved actions, etc.)
- Integrates actionlint for additional validation
- Helps maintain secure and consistent workflow definitions

## Execution Steps

### Step 1: Run the Linter

Execute the bwwl linter on the workflows directory:

```bash
bwwl lint -f .github/workflows
```

**Important:**
- Capture both stdout and stderr
- Parse the output to identify all errors and warnings
- Note which files and line numbers have issues

### Step 2: Parse Output and Identify Errors

The linter output will show:
- Rule violations (e.g., `RulePermissionsExist`, `RuleJobRunnerVersionPinned`)
- File paths and line numbers
- Error descriptions

Group errors by:
1. **File**: Which workflow file has issues
2. **Rule**: Which rule is being violated
3. **Location**: Line number or context

### Step 3: Fix Detected Errors

Use the Read tool to examine workflow files with errors, then use the Edit tool to fix them. Fix only errors, not warnings or other findings.

### Step 4: Verify Fixes

After making changes, re-run the linter:

```bash
bwwl lint -f .github/workflows
```

**Verification checklist:**
- All previously reported errors are resolved
- No new errors were introduced
- Output shows "No issues found" or clean results

If errors remain:
- Analyze why the fix didn't work
- Adjust the approach
- Repeat until all auto-fixable errors are resolved

### Step 5: Report Results

Provide a comprehensive summary:

```
## Linting Results

### Files Modified
- `.github/workflows/build.yml`
- `.github/workflows/deploy.yml`

### Errors Fixed
1. **RulePermissionsExist** (2 occurrences)
   - Added `permissions: contents: read` to build.yml
   - Added `permissions: contents: write` to deploy.yml

2. **RuleJobRunnerVersionPinned** (3 occurrences)
   - Replaced `ubuntu-latest` with `ubuntu-24.04` in build.yml (2 jobs)
   - Replaced `ubuntu-latest` with `ubuntu-24.04` in deploy.yml (1 job)

3. **RuleNameCapitalized** (1 occurrence)
   - Fixed workflow name capitalization in build.yml

### Remaining Issues
None - all workflows pass linting.
```

## Error Handling

### When BWWL Is Not Installed
- Clearly inform the user
- Provide the installation link
- Do not attempt to install it yourself
- Wait for user confirmation before proceeding

### When Errors Cannot Be Auto-Fixed
Some issues require human judgment:
- **Unapproved actions**: Need security review
- **Permission requirements**: May need discussion with team
- **Complex syntax errors**: May indicate deeper workflow issues

For these cases:
1. Clearly identify the issue
2. Explain why it needs manual intervention
3. Provide recommendations or options
4. Ask the user for guidance

### When Multiple Fixes Are Needed
- Prioritize by severity (security issues first)
- Group related fixes by file
- Apply fixes systematically, not all at once
- Verify after each group of fixes

## Best Practices

1. **Read before editing**: Always use Read tool to examine workflow files before making changes
2. **Understand context**: Don't just mechanically apply fixes - understand what the workflow does
3. **Preserve functionality**: Ensure fixes don't break the workflow's intended behavior
4. **Test assumptions**: If unsure about a fix, ask the user for clarification
5. **Document changes**: Clearly explain what was changed and why

## Tool Usage Guidelines

- **Bash tool**: Use for running `bwwl lint` commands
- **Read tool**: Use to examine workflow files before editing
- **Edit tool**: Use to apply fixes to workflow files
- **Grep tool**: Use to search for patterns across multiple workflow files if needed
- **Glob tool**: Use to find all workflow files if needed

## Example Workflow

```bash
# 1. Run initial lint
bwwl lint -f .github/workflows

# 2. Read file with errors
# (Use Read tool on specific workflow file)

# 3. Fix errors
# (Use Edit tool to apply fixes)

# 4. Verify
bwwl lint -f .github/workflows

# 5. Report results to user
```

## Notes

- BWWL is specifically designed for Bitwarden's security and consistency requirements
- Some rules may be stricter than general GitHub Actions best practices
- When in doubt, prefer security over convenience
- Always verify fixes don't break existing functionality

