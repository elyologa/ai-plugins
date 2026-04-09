---
name: perform-preflight
description: Quality gate checklist to run before committing or creating a PR. Use when finishing implementation, checking work quality, or preparing to commit. Triggered by "preflight", "self review", "ready to commit", "check my work", "quality gate".
---

# Preflight Checklist

Run this checklist before committing or creating a PR. Consult the repo's CLAUDE.md for platform-specific commands and requirements.

## Tests

- [ ] Run tests for affected modules — consult CLAUDE.md or the repo's build/test skill for the correct commands
- [ ] New code has test coverage
- [ ] No existing tests broken by changes

## Code Quality

- [ ] Lint passes — run the repo's linter (consult CLAUDE.md for the command)
- [ ] Format passes — run the repo's formatter (consult CLAUDE.md for the command)
- [ ] No TODO comments without Jira ticket references (if enforced by the repo)
- [ ] Public APIs have documentation (KDoc, DocC, XML docs, etc. per repo convention)

## Security

- [ ] No plaintext secrets, API keys, or credentials in code or config
- [ ] Sensitive data stored using platform-appropriate secure storage (consult CLAUDE.md Security Rules)
- [ ] User input is validated before processing
- [ ] No sensitive data in log statements
- [ ] Zero-knowledge architecture preserved — no unencrypted vault data logged, persisted, or transmitted

## Architecture

- [ ] Changes follow established patterns documented in CLAUDE.md and architecture docs
- [ ] No new patterns introduced when existing ones apply
- [ ] DI/injection patterns followed per repo convention
- [ ] Error handling follows repo convention (Result types, sealed classes, etc.)

## Files

- [ ] No build artifacts or generated files staged
- [ ] No IDE-specific files staged (`.idea/`, `.xcuserdata/`, etc.)
- [ ] No credential files or signing keys staged
- [ ] String resources added to the correct location (if applicable)
