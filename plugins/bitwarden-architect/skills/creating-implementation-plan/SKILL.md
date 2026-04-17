---
name: creating-implementation-plan
description: This skill should be used when the user asks to "create an implementation plan", "produce a plan for PM-XXXX", "write an implementation plan", "break this feature into phases", or otherwise requests a structured plan artifact ready for handoff to an implementer. Produces a markdown plan with pattern anchors, blast radius, phased task breakdown, risks, and open questions.
when_to_use: Architectural decisions are made and a structured plan artifact is required, Handoff to an implementer is imminent, Converting a refined spec into a phased engineering plan, Documenting a planned change for review before code lands
argument-hints: Jira ticket key (e.g., PM-XXXX), Architectural decisions or design notes from prior reasoning, Target repository slug (server, clients, sdk-internal, android, etc.), Confluence page URL or plain-text feature description
---

## Scope

This skill produces a single artifact: an implementation plan written to `${CLAUDE_PLUGIN_DATA}/plans/{slug}-IMPLEMENTATION-PLAN.md`. It does not do architectural thinking — pair with `bitwarden-architect:architecting-solutions` upstream if principles, blast radius, and trade-offs have not yet been reasoned through.

Derive the slug from the ticket and target (e.g., `pm-32009-new-item-types-server`). Create the output directory if it does not exist.

## Discover Per-Repo Planning Skills First

Before using the default template, look in `<repo>/.claude/skills/` for a planning-related skill (anything matching triggers like "plan implementation", "architecture design", or similar). If one exists, defer the artifact shape to it — invoke via the `Skill` tool if available, otherwise read the `SKILL.md` directly. Per-repo planning skills own platform-specific phase conventions, test commands, and "definition of done" for their repo.

Use the template below only when no per-repo planning skill exists.

## Default Template

```markdown
# Implementation Plan: [Feature Name]

## Current State
What's already shipped (verify against the working tree, not the ticket). Pattern anchors with `file:line`.

## Blast Radius
Affected modules — Primary / Secondary / No-change-verified.

## Design
Type model, interfaces, data flow.

## Phases
Dependency-ordered, each one PR. Per phase: tasks, files, acceptance.

## Risks & Open Questions
Likelihood × impact + mitigation. Tech debt surfaced (don't silently fix). Questions for the human (don't invent answers).
```

## Section Guidance

- **Current State:** Read the working tree, not the ticket description. Tickets overrun what's actually shipped. Cite concrete `file:line` anchors for every pattern the plan will mirror.
- **Blast Radius:** Group as Primary (must change), Secondary (verify, likely no change), No-change-verified (confirmed via grep or read). Naming the "no change" set is load-bearing — it tells reviewers what was considered.
- **Design:** Show how new code coexists with existing patterns. Text-based data-flow diagrams are fine. Do not invent new abstractions where three similar lines would do.
- **Phases:** Each phase should be independently reviewable as a single PR. Per phase: tasks, files touched, acceptance criteria. Phase 0 is typically pre-flight (verify assumptions, confirm upstream artifacts, regenerate bindings).
- **Risks & Open Questions:** Include likelihood × impact + mitigation. Separate "tech debt surfaced" (flag, don't fix) from "risks" (must mitigate). Open questions go to the human — never invent answers.

## Companion Skills

Compose with adjacent skills when the plan crosses their domain:

- `bitwarden-architect:architecting-solutions` — architectural thinking (principles, blast radius heuristics, security mindset). Invoke upstream if not already done.
- `bitwarden-product-analyst:requirements-elicitation` — when requirements are ambiguous or the ticket lacks acceptance criteria.
- `bitwarden-product-analyst:work-breakdown` — to convert the plan's phases into Jira-ready tasks.
- `bitwarden-security-engineer:threat-modeling` — new trust boundaries, new PII/secret classes, crypto changes.
- `bitwarden-software-engineer:writing-server-code`, `bitwarden-software-engineer:writing-client-code`, `bitwarden-software-engineer:writing-database-queries`, `bitwarden-software-engineer:implementing-dapper-queries`, `bitwarden-software-engineer:implementing-ef-core` — language and repo conventions when the plan targets code sites in those stacks.
