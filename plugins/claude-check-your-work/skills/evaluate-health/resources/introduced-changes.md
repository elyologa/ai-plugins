# Introduced Changes

Examine the changed files and classify any debt signals from the Tech Debt Inventory as one of:

**Introduced:** A debt signal that was not present before the change. The implementation added it.

**Worsened:** A debt signal that existed before the change but was made worse by it.

**Resolved:** A debt signal that the implementation cleaned up. Note these briefly.

For each introduced or worsened signal, determine: does it create or maintain a hazard? A signal is hazardous if it creates a situation in which code is likely to be:

- **Misused** — callers or dependents are likely to use it incorrectly
- **Subverted** — the structure invites workarounds rather than correct usage
- **Exploited** — the structure creates a path that allows callers to bypass intended constraints or safety guarantees

If a signal does not create a hazard, note it briefly and move on.

If a signal **does** create a hazard, produce a Before/After comparison:

- **Before:** Characterize the code prior to the change. What did it look like? What constraints did it impose?
- **After:** Characterize the code as the change leaves it. What does it now look like? What does this enable or invite?
- **Material difference:** State the concrete outcome difference between Before and After. Exploitable hazards are consequential. For misuse and subversion, mark it consequential if reasonable engineers could weigh this differently.
