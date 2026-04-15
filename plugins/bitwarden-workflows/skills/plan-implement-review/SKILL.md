---
name: plan-implement-review
description: End-to-end pipeline orchestrating requirements analysis, architecture planning, implementation, and multi-agent code review via agent team. Use when starting a feature from a Jira ticket, planning multi-repo work, or running a full plan-implement-review cycle. Triggered by "plan and implement", "plan-implement-review", "end-to-end pipeline", "PIR".
---

# Plan-Implement-Review Pipeline

You are the **team lead** for an end-to-end development pipeline. Use **Claude Agent Teams** to create a team, define tasks with dependencies, and add teammates.

**Input**: $ARGUMENTS

## Input Parsing

Parse `$ARGUMENTS`: strip `--confirm` flag (enables **gated mode** — present output and get user approval between phases; default is **autonomous mode**). Derive a slug from the task description (lowercase, hyphens, max 40 chars).

**Output paths** (using slug):
- `${CLAUDE_PLUGIN_DATA}/plans/{slug}-REQUIREMENTS.md`
- `${CLAUDE_PLUGIN_DATA}/plans/{slug}-IMPL-{REPO}.md` (one per in-scope repo)
- `${CLAUDE_PLUGIN_DATA}/plans/{slug}-WORK-BREAKDOWN.md`
- `${CLAUDE_PLUGIN_DATA}/plans/{slug}-QA-HANDOFF.md`
- `${CLAUDE_PLUGIN_DATA}/reviews/{slug}-REVIEW-{REVIEWER}.md` (one per reviewer per phase)
- `${CLAUDE_PLUGIN_DATA}/reviews/{slug}-REVIEW-SUMMARY.md`

## Pipeline Structure

```
Plan (once):
  Requirements → Architecture (parallel, per repo) → Work Breakdown → QA Handoff

Implement+Review (per phase from WBD):
  Phase 1: Implement → Review → Fix cycle → ✓
  Phase 2: Implement → Review → Fix cycle → ✓
  ...
  Phase N: Implement → Review → Fix cycle → ✓

Shutdown
```

## Prerequisites

If a plugin is not installed, offer to **skip that teammate** rather than blocking the pipeline.

| Plugin | Required For |
|--------|-------------|
| `bitwarden-product-analyst` | Requirements analysis + requirements review |
| `bitwarden-architect` | Architecture planning + architecture review |
| `bitwarden-software-engineer` | Implementation |
| `bitwarden-security-engineer` | Security review |
| `bitwarden-code-review` | Code quality review |
| `bitwarden-delivery-tools` | Committing, PRs, preflight, labeling |
| `bitwarden-atlassian-tools` | Optional — Jira/Confluence fetching |

## Step 1: Create Team

Team name: `pir-{slug}`. Create `${CLAUDE_PLUGIN_DATA}/plans/` and `${CLAUDE_PLUGIN_DATA}/reviews/` directories.

## Step 2: Plan Phase

### Planning Tasks

| Task | Subject | Description | blockedBy |
|------|---------|-------------|-----------|
| 1 | Analyze requirements | Analyze requirements for: {task description}. Write to `{slug}-REQUIREMENTS.md`. Include high-level work breakdown and **explicitly list which repositories are in scope**. | [] |

After Task #1 completes, the **read the requirements spec** and identify in-scope repos. Then create:

- **One architecture task per repo**: Read the requirements spec, analyze the `{repo}/` directory, design architecture, write to `{slug}-IMPL-{REPO}.md`. Blocked by Task #1. All run in parallel.
- **WBD task**: Consolidate all `{slug}-IMPL-*.md` plans with the requirements into a Jira-ready work breakdown. Blocked by all architecture tasks.
- **QA handoff task**: Define testable increments per phase from the WBD. Blocked by WBD.

### Planning Teammates

Shut down after planning completes.

| Teammate Name | Agent Type | Task | Role |
|---------------|-----------|------|------|
| `product-analyst` | `bitwarden-product-analyst:product-analyst` | 1 | Requirements specification |
| `architect-{repo}` | `bitwarden-architect:architect` | per-repo | One per in-scope repo. Spawned after Task #1. |
| `wbd-author` | `bitwarden-architect:architect` | WBD | Consolidate breakdowns |
| `qa-handoff-author` | `bitwarden-product-analyst:product-analyst` | QA | QA handoff document |

### Standing Teammates

Persist across all implementation phases. **Implementers are per-repo** (matching the architect pattern). Created after Task #1 identifies in-scope repos.

| Teammate Name | Agent Type | Role |
|---------------|-----------|------|
| `implementer-{repo}` | `bitwarden-software-engineer:bitwarden-software-engineer` | One per in-scope repo. Implement, test, build, preflight, commit within `{repo}/`. |
| `requirements-reviewer` | `bitwarden-product-analyst:product-analyst` | Requirements conformance |
| `architecture-reviewer` | `bitwarden-architect:architect` | Architecture and pattern adherence |
| `security-reviewer` | `bitwarden-security-engineer:bitwarden-security-engineer` | Security and zero-knowledge compliance |
| `code-reviewer` | `bitwarden-code-review:bitwarden-code-reviewer` | Code quality |

**All standing teammates wait for explicit instructions from the team lead.** They must NOT self-activate.

### Planning Completion

1. Shut down planning teammates. Standing implementers and reviewers remain.
2. Read the WBD, extract the ordered phase list.
3. Present phase plan to user. Proceed to implementation loop.

## Step 3: Implementation Loop (per phase)

### 3a: Dispatch Implementer

Each WBD phase targets a specific repo. Dispatch `implementer-{repo}`:

1. Create task: `[{repo}] Implement Phase {N}: {phase name}`
2. Assign to `implementer-{repo}`.
3. Send: phase scope, path to `{slug}-IMPL-{REPO}.md`, target repo directory. Instruct to commit when done.
4. Wait for completion. Verify commits exist.

### 3b: Dispatch Reviewers

**CRITICAL**: Do NOT dispatch reviewers until the implementer has committed.

Create one review task per reviewer. Each reviewer writes findings to their output file. Wait for all 4 to complete.

### 3c: Consolidate and Fix

1. Read all 4 review files. Write a consolidated summary to `{slug}-REVIEW-SUMMARY.md` with **Critical**, **Important**, and **Suggestions** sections. Deduplicate overlapping findings.
2. If no critical/important issues → proceed to next phase.
3. If issues exist → send consolidated findings to `implementer-{repo}`. The implementer assesses each finding (fix or dispute with the reviewer). After fixes, re-run reviews. **Max 3 rounds** — after 3 rounds with unresolved issues, escalate to user.

### 3d: Phase Transition

Print phase completion status. Group tightly coupled phases into a single cycle (max 3 per group). In gated mode, wait for user approval before proceeding.

## Step 4: Shutdown

1. Shutdown all remaining teammates. Delete team.
2. Present final summary: artifact paths, phases completed, review cycles, commits.
3. Suggest next steps — create PR via `Skill(bitwarden-delivery-tools:creating-pull-request)` if all issues resolved.
