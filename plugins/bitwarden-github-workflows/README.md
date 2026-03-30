# Bitwarden GitHub Workflows Plugin

AI-powered GitHub Actions workflow linting using Bitwarden's custom workflow linter (bwwl).

## Overview

This plugin provides a skill that runs Bitwarden's internal workflow linter (`bwwl`) against GitHub Actions workflow files, parses the results, and automatically fixes detected errors.

## Features

- **Automated Linting**: Runs `bwwl lint` on `.github/workflows/` and captures all errors
- **Auto-Fix**: Applies fixes for common rule violations (permissions, runner versions, naming)
- **Verification**: Re-runs the linter after fixes to confirm all errors are resolved
- **Structured Reporting**: Summarizes what was changed and any remaining issues requiring manual attention

## Skills

### `lint-workflows`

Lints GitHub Actions workflow files using `bwwl` and fixes any detected errors.

**Triggers**: "lint workflows", "fix workflow errors", "run bwwl"

**Steps**:
1. Run `bwwl lint -f .github/workflows`
2. Parse output and group errors by file, rule, and location
3. Fix errors using Read/Edit tools
4. Re-run linter to verify all fixes
5. Report results

**Rules enforced by bwwl** (examples):
- `RulePermissionsExist` — jobs must declare explicit permissions
- `RuleJobRunnerVersionPinned` — runners must use pinned versions (e.g., `ubuntu-24.04` not `ubuntu-latest`)
- `RuleNameCapitalized` — workflow and job names must be capitalized
- Approved actions list enforcement
- Additional checks via integrated `actionlint`

## Requirements

- [`bwwl`](https://github.com/bitwarden/workflow-linter) must be installed and available in `PATH`
- GitHub Actions workflows in `.github/workflows/`

## Directory Structure

```
bitwarden-github-workflows/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata
├── skills/
│   └── lint-workflows/
│       └── SKILL.md         # Workflow linting skill
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md                # This file
```

## Installation

Available through Bitwarden's internal Claude Code marketplace:

```bash
# Add the Bitwarden marketplace (if not already added)
/plugin marketplace add https://github.com/bitwarden/ai-plugins

# Install the plugin
/plugin install bitwarden-github-workflows@bitwarden-marketplace

# Restart Claude Code
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on updating this plugin.

## License

Bitwarden

## Maintainers

- @team-ai-sme

## Support

For issues or questions:

- Internal: #ai-discussions Slack channel
- GitHub Issues: [bitwarden/ai-plugins](https://github.com/bitwarden/ai-plugins/issues)
