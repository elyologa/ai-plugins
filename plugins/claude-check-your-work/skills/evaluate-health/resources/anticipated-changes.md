# Anticipated Changes

Identify each structural change the requested implementation implies. Classify every change as one of:

**Necessary:** The change must happen to implement the request. It is not optional. Reversibility is not a concern — record it and move on.

**Incidental:** The change is not strictly required. It would naturally accompany the implementation, but the request could be satisfied without it.

For each incidental change, determine: does it reduce reversibility? A change reduces reversibility if making it would make it materially harder to undo or adjust in the future — for example, by deleting information, changing a public interface, or coupling two previously independent concerns.

If an incidental change does not reduce reversibility, note it briefly and move on.

If an incidental change **does** reduce reversibility, produce a Baseline/Proposed comparison:

- **Baseline:** Characterize the codebase if this change is NOT made. What constraints does the status quo impose? What does the calling code look like?
- **Proposed:** Characterize the codebase if this change IS made. What does it enable or foreclose?
- **Material difference:** State the concrete outcome difference between Baseline and Proposed. If reasonable engineers could weigh this differently — if it is a value judgement rather than an obvious improvement — mark it consequential.
