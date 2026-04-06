---
name: evaluate-documentation
description: Reviews JSDoc, inline comments, and consumer-facing documentation against quality criteria. Produces a structured report of findings.
disable-model-invocation: true
user-invocable: false
---
# How to Review Documentation

Tips for effective review:

1. **Separate the two audiences:** Documentation serves consumers; inline comments serve implementors. Problems often come from mixing them up.

## Step 1: Identify the Unit to Review

You should receive a description of the unit to review. This may be:

- A file path, possibly with a specific method, class, or line range
- A function, method, class, module, or interface name — locate it in the codebase

**IMPORTANT:** If you cannot identify the unit to review, reject the request and ask for clarification.

## Step 2: Read the Implementation and Existing Documentation

Read the full implementation. Then read its documentation and any inline comments.

Ask yourself:
- What does this unit actually do?
- What are the behavioral conditions or contract (for callables: when does it return early or throw; for types: what invariants must hold)?
- What design decisions were made, and are any non-obvious?

# Step 3: Look for Related Content

Use situational awareness to identify documentation or inline comments near the unit that may be impacted by the change. Include these in your review.

## Step 4: Review Against Criteria

Review the documentation using the criteria below as well as any criteria provided in the prompt.

| Format | Criteria |
|--------|----------|
| General | [common-criteria.md](./resources/common-criteria.md) |
| TypeScript | [typescript-criteria.md](./resources/typescript-criteria.md) |

Apply the general criteria always; apply format-specific criteria when relevant.

For each issue found:
- Identify the specific line(s) affected
- Explain the problem
- Suggest a concrete improvement

## Step 5: Provide a Summary

Use the [report template](./resources/report.md) to summarize your findings.
