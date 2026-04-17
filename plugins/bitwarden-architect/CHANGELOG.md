# Changelog

All notable changes to the `bitwarden-architect` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-17

### Added

- `creating-implementation-plan` skill — produces a structured implementation plan artifact (`${CLAUDE_PLUGIN_DATA}/plans/{slug}-IMPLEMENTATION-PLAN.md`) with per-section guidance. Discovers per-repo planning skills in `<repo>/.claude/skills/` and defers to them when present; otherwise uses a default template (Current State → Blast Radius → Design → Phases → Risks & Open Questions).
- `when_to_use` and `argument-hints` frontmatter fields on both skills for clearer trigger contexts and input expectations (Jira ticket, Confluence URL, plain-text feature description).
- Named companion-skill pointers in `architecting-solutions` (threat-modeling, reviewing-security-architecture, requirements-elicitation, work-breakdown, writing-server-code, writing-client-code, writing-database-queries, implementing-dapper-queries, implementing-ef-core).

### Changed

- `architecting-solutions` scope narrowed to pure architectural thinking (principles, security mindset, judgment, red flags). Deliverable template, Work Breakdown Document, and Architecture Review sections moved out — plan production now lives in `creating-implementation-plan`; work breakdown routes to `bitwarden-product-analyst:work-breakdown`; security architecture review routes to `bitwarden-security-engineer:reviewing-security-architecture`.
- Threat-modeling reference now names `bitwarden-security-engineer:threat-modeling` directly instead of hand-waving at "a dedicated threat-modeling skill".

## [1.0.0] - 2026-04-16

### Added

- Architect agent for technical planning and implementation phasing across Bitwarden repositories
- `architecting-solutions` skill with Bitwarden-specific architectural principles, security mindset, and judgment heuristics
- Cross-plugin integration with security-engineer, product-analyst, software-engineer, and atlassian-tools plugins
