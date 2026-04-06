# Structural Health Report

## Scope

List the files and modules examined.

---

## Tech Debt Inventory

For each signal found, record its location, type, severity, and whether it is consequential to the requested change. Use `blocking` for signals that should be resolved before proceeding, `significant` for debt that will compound if ignored, and `minor` for low-risk observations.

| # | File | Line | Signal Type | Severity | Consequential | Notes |
|---|------|------|-------------|----------|---------------|-------|
| 1 | | | | | | |

If no signals were found, state: **No tech debt signals identified in the examined scope.**

---

## Change Analysis

### Necessary Changes

Changes that must happen to implement the requested change. Reversibility is not a concern for these.

- List each necessary change as a bullet.

### Incidental Changes

Changes that are not strictly required but would naturally accompany the implementation. For each incidental change that reduces reversibility, provide an h0/h* comparison.

---

#### Incidental Change: [Short title]

**Description:** What this change does and why it is not strictly necessary.

**Reduces reversibility:** Yes / No

*(If No, no comparison is needed. If Yes, continue below.)*

**Baseline — Without this change:**
Describe the state of the codebase if this change is not made. What does the calling code look like? What constraints does it impose on future changes?

**Proposed — With this change:**
Describe the state of the codebase if this change is made. What does the calling code look like? What doors does it close?

**Material difference:**
State the concrete outcome difference between Baseline and Proposed. If this difference represents a value judgement — a trade-off where reasonable engineers could disagree — mark it consequential.

**Consequential:** Yes / No

---

## Health Summary

Summarize the overall structural health of the examined scope in 2–4 sentences. Characterize the load-bearing patterns, the severity of accumulated debt, and the general cost of the requested change landing here.

---

## Open Flags

List anything that warrants further investigation or that the downstream decision-maker should be aware of but that falls outside the scope of this review.

- (None)
