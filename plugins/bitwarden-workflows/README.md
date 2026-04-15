# Bitwarden Workflows

Multi-agent orchestration workflows for Bitwarden development. Composes marketplace agents into end-to-end pipelines via Teams and task dependencies.

## Overview

This plugin provides composed workflows that coordinate multiple marketplace agents into structured, multi-step pipelines. Each workflow uses Teams for teammate management, task dependencies for execution ordering, and dynamic per-repo agent dispatch for cross-repo features.

## Skills

| Skill | Triggers | Purpose |
|-------|---------|---------|
| `plan-implement-review` | "plan and implement", "PIR", "end-to-end pipeline" | Full development pipeline: requirements → architecture → implementation → review |

## plan-implement-review

End-to-end development pipeline that orchestrates 6 agent types through a structured lifecycle:

1. **Plan** (once) — Product analyst produces requirements, per-repo architects produce implementation plans in parallel, then a work breakdown and QA handoff are consolidated
2. **Implement + Review** (per phase) — Per-repo software engineers implement each phase, then a 4-reviewer gauntlet (requirements, architecture, security, code quality) reviews the changes with up to 3 fix rounds before escalation
3. **Shutdown** — Teammates are shut down, artifacts summarized, next steps suggested

Supports `--confirm` flag for gated mode (user approval between phases) or runs autonomously by default. Handles multi-repo Epics by dynamically creating per-repo architects and implementers based on what the requirements spec identifies as in scope.

### Prerequisites

| Plugin | Role in pipeline |
|--------|-----------------|
| `bitwarden-product-analyst` | Requirements analysis, QA handoff, requirements review |
| `bitwarden-architect` | Architecture planning, architecture review |
| `bitwarden-software-engineer` | Implementation with self-review |
| `bitwarden-security-engineer` | Security review |
| `bitwarden-code-review` | Code quality review |
| `bitwarden-delivery-tools` | Committing, PRs, preflight, labeling |
| `bitwarden-atlassian-tools` | Optional — Jira/Confluence fetching |

Missing plugins are skipped gracefully rather than blocking the pipeline.

## Installation

Install via the Bitwarden AI Marketplace.
