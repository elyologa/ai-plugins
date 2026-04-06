---
name: evaluate-health
description: Evaluates structural health of code in the context of a change. Inventories tech debt signals, classifies changes, and produces a factual report.
disable-model-invocation: true
user-invocable: false
---
# How to Perform a Structural Health Review

## Step 1: Verify Available Information

Before proceeding, confirm you have sufficient information to scope the review.

For a **prospective** review (before implementation):
- A description of the requested change
- Identification of the files or modules the change is expected to affect

For a **retrospective** review (after implementation):
- The set of files changed by the implementation (a diff, a branch, or an explicit file list)

If the necessary information is not present, stop and request it before continuing.

## Step 2: Broaden Scope

Identify the files and modules directly affected by the change. Then expand the scope to include:
- Modules the affected files import from or depend on
- Shared abstractions the affected code relies on
- Test files associated with the affected modules

Do not expand scope arbitrarily. Examine what the change touches, not the entire codebase.

## Step 3: Inventory Tech Debt

Using the [common criteria](./resources/common-criteria.md), examine the scoped files for structural health signals.

For each signal found, record:
- The file and line number
- The type of signal (from the criteria list)
- Its severity: `blocking` (should be resolved before proceeding), `significant` (will compound if ignored), or `minor` (low-risk observation)

Do not fix anything. Do not suggest implementations. Observe and record.

## Step 4: Classify the Changes

**For a prospective review**, use [anticipated-changes.md](./resources/anticipated-changes.md) to classify the structural changes the implementation implies. Incidental changes that reduce reversibility warrant a Baseline/Proposed comparison.

**For a retrospective review**, use [introduced-changes.md](./resources/introduced-changes.md) to classify signals by whether the implementation introduced or worsened them. Signals that create or maintain a hazard warrant a Before/After comparison.

## Step 5: Produce the Report

Use the [report template](./resources/report.md) to produce a structured summary of your findings.

The report is the output of this review. Make it precise and factual. Avoid recommendations about implementation. Avoid opinions about what should be done. Present what is there, what the change requires or introduced, and where the value judgements lie.
