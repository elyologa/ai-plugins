# Changelog

All notable changes to the Bitwarden Product Analyst plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-02

### Changed
- Updated agent to treat Confluence product initiative pages as the canonical primary source type, with an explicit mapping table from Confluence sections to requirements template sections
- Agent now invokes `Skill(atlassian-reader)` immediately when a Confluence URL or Jira ticket is provided, without waiting to be asked
- Updated requirements document structure list to match the full template (added Measurable Outcomes, Competitive Context, Customer Migration, Team Considerations, Discoverability & Notifications, Product Positioning, and Design Documentation sections)
- Agent now attributes every [TBD] to a role owner: PM, Design, or Engineering
- Agent now distinguishes between the four separate web app surfaces (Password Manager, Admin Console, Secrets Manager, Provider Portal) rather than treating "web" as a single surface
- Added explicit output location: `plugins/bitwarden-product-analyst/specs/`
- Added iterative delivery constraint check (no item > small/medium, no item spans more than one quarter)
- Added guidance to consider feature flags and organizational policy implications for all new vault features
- Added note about discrepancy between P03/P04 labels in agent vs. some internal documentation
- Expanded trigger phrases to include "create spec", "write spec", "spec out", "product spec", "turn this into a spec"
- Updated Bitwarden plan names and client surface names to use exact canonical terminology
- Corrected security principle labels to align with the requirements template (P03 Trust Hierarchy, P04 Cryptographic Safety, P06 Transparency)

### Added
- Post-MVP candidate surfacing: agent now explicitly notes deferred items and natural extensions discovered during analysis

## [1.0.0] - 2026-03-02

### Added
- Initial release of Bitwarden Product Analyst plugin
- Product analyst agent for creating comprehensive Bitwarden requirements documents
- `requirements-elicitation` skill for extracting and organizing requirements
- `work-breakdown` skill for decomposing features into implementable tasks
- Requirements document template following Bitwarden standards
- Integration with Bitwarden security vocabulary and principles (P01-P06)
- Support for analyzing multiple sources (GitHub issues, technical docs, user requests)
- Structured requirements output with security considerations
