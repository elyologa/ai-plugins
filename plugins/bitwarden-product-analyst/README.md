# Bitwarden Product Analyst

A specialized product analyst agent for creating comprehensive requirements documents for Bitwarden features and enhancements.

## Overview

The Bitwarden Product Analyst plugin provides an AI-powered product analyst that researches, analyzes, and synthesizes requirements from multiple sources into well-structured specification documents following Bitwarden standards.

## Features

- **Multi-Source Analysis**: Synthesizes information from GitHub issues, technical documentation, user requests, and architecture specifications
- **Requirements Extraction**: Identifies functional, non-functional, and security requirements using the `requirements-elicitation` skill
- **Work Breakdown**: Decomposes features into actionable, implementable tasks using the `work-breakdown` skill
- **Bitwarden Standards**: Applies Bitwarden security vocabulary, principles (P01-P06), and documentation patterns
- **Comprehensive Documentation**: Produces detailed requirements documents with context, constraints, acceptance criteria, and verification procedures
- **Security Integration**: Considers data classification, security channels, and threat scenarios in all requirements

## Installation

This plugin is part of the Bitwarden AI Plugins marketplace. To install:

1. Ensure you have Claude Code installed
2. The plugin will be available in the marketplace catalog
3. Install via the marketplace UI or by adding to your `.claude-plugin/marketplace.json`

## Usage

### Invoking the Product Analyst Agent

Use any of these trigger phrases to invoke the product analyst:

- "analyze requirements for [feature]"
- "create specification for [feature]"
- "research [feature] requirements"
- "document requirements for [feature]"
- "gather requirements from [sources]"

### Example Invocations

**Example 1: Analyze a GitHub Issue**
```
Analyze requirements for GitHub issue #1234 - Add OAuth authentication support
```

**Example 2: Multiple Sources**
```
Create a specification for the vault export feature. Use:
- GitHub issue #5678
- The security architecture doc at docs/security/export-design.md
- User feedback from the forum thread [URL]
```

**Example 3: Research Phase**
```
Research requirements for implementing end-to-end encrypted file sharing.
I need to understand:
- Security implications
- Cross-platform considerations
- Performance requirements
```

### Agent Capabilities

The product analyst agent will:

1. **Read all provided sources** thoroughly (GitHub issues, documentation, URLs, local files)
2. **Extract requirements** using the requirements-elicitation skill
   - Functional requirements (what the system must do)
   - Non-functional requirements (performance, reliability, compatibility)
   - Security requirements (data classification, security principles)
   - Constraints and dependencies
3. **Organize work** using the work-breakdown skill
   - Break down into phases and tasks
   - Identify dependencies
   - Create acceptance criteria
4. **Produce a comprehensive requirements document** following the template structure

### Skills Included

#### requirements-elicitation
Extracts complete, unambiguous requirements from specifications by:
- Identifying functional and non-functional requirements
- Flagging ambiguities and asking targeted questions
- Identifying constraints (technical, security, business)
- Creating testable acceptance criteria
- Applying Bitwarden security principles and vocabulary

**Trigger phrases**: "extract requirements", "analyze specification", "identify requirements", "clarify ambiguities"

#### work-breakdown
Breaks down features into actionable tasks by:
- Creating right-sized tasks (2-8 hours each)
- Organizing into logical phases (Architecture, Implementation, Testing, Documentation)
- Identifying dependencies and task ordering
- Defining team assignments and deliverables
- Ensuring comprehensive coverage of all requirements

**Trigger phrases**: "break down tasks", "create work plan", "organize implementation", "plan development"

## Output Format

The product analyst produces a Markdown requirements document with these sections:

- **Overview** — Goal, user story, context
- **Requirements** — Functional, non-functional, required work, out of scope
- **Open Questions** — Items needing stakeholder clarification
- **Constraints & Limitations** — Technical and business constraints
- **Success Criteria** — Definition of done, acceptance tests, verification commands
- **Security & Safety** — Data classification, security principles, threat considerations
- **Testing Strategy** — Unit, integration, E2E, manual test scenarios
- **Implementation Checklist** — Files to modify, patterns to follow
- **References** — Links to documentation, research, related work

See `references/requirements-template.md` for the full template structure.

## Bitwarden-Specific Features

### Security Vocabulary
The analyst uses standard Bitwarden security terminology:
- **Vault Data**, **Protected Data**
- **Data at Rest/in Use/in Transit**
- **Secure Channel**, **Trusted Channel**
- **Data Exporting/Sharing/Leaking**

### Security Principles
Requirements reference Bitwarden's core security principles:
- **P01**: Servers are Zero Knowledge
- **P02**: A Locked Vault is Secure
- **P03**: Limited Security on Semi-Compromised Devices
- **P04**: No Security on Fully Compromised Systems
- **P05**: Controlled Access to Vault Data
- **P06**: Minimized Impact of Security Breaches

### Cross-Plugin Integration

**Security Analysis**: When the **bitwarden-security-engineer** plugin is installed, the analyst can invoke:
- `threat-modeling` skill for security-critical features

**Jira and Confluence**: When the **atlassian-reader** plugin is installed, the analyst can:
- Read Jira issues directly (e.g., "analyze requirements from JIRA-1234")
- Read Confluence pages via URL or space/title reference
- Incorporate authenticated Atlassian content into requirements analysis

## Example Workflow

1. **User provides sources**:
   ```
   Analyze requirements for the password sharing feature.
   Sources:
   - GitHub issue #9876
   - Design doc at docs/features/password-sharing.md
   - Security principles at https://contributing.bitwarden.com/architecture/security/definitions
   ```

2. **Agent researches** (reads all sources, web searches if needed)

3. **Agent extracts requirements** (functional, non-functional, security)

4. **Agent organizes work** (phases, tasks, dependencies)

5. **Agent produces requirements document** (comprehensive specification)

6. **User reviews and refines** (asks follow-up questions, requests clarifications)

## Version

**Current Version**: 1.0.0

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Contributing

This plugin is part of the Bitwarden AI Plugins repository. See the main repository's [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## License

This plugin follows the Bitwarden AI Plugins repository license.

## Support

For issues, questions, or feature requests, please open an issue in the [Bitwarden AI Plugins repository](https://github.com/bitwarden/ai-plugins/issues).
