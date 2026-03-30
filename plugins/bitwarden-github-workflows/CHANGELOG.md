# Changelog

All notable changes to the Bitwarden GitHub Workflows Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-30

### Added

- Initial release of `bitwarden-github-workflows` plugin
- `lint-workflows` skill that runs `bwwl lint` on `.github/workflows/`
- Automatic error detection and fixing for common bwwl rule violations
- Post-fix verification step to confirm all errors are resolved
- Structured reporting of changes made and any remaining manual-intervention items

---

## Version Format

- **Major version**: Breaking changes to skill behavior or incompatible workflow changes
- **Minor version**: New rules supported, new auto-fix capabilities, or new skills added
- **Patch version**: Bug fixes, clarifications, documentation improvements
