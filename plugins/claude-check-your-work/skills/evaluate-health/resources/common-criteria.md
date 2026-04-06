# Structural Health Criteria

This is a guide for identifying tech debt and structural strain in code. Reference it when examining files to produce a health inventory.

---

## 1. Test Coverage Gaps

**Question:** Are observable behaviors covered by unit tests?

**Signals:**
- No test file exists for the module
- Behaviors are present with no corresponding test case
- Tests exist but cover only the happy path

**Why it matters:** Untested code encodes unverified assumptions. Changes land without a safety net.

---

## 2. Stale or Conflicting Documentation

**Question:** Does the documentation describe what the code actually does?

**Signals:**
- JSDoc parameter names or types don't match the function signature
- A comment describes behavior that the implementation no longer exhibits
- Inline comments restate the code ("increment i by 1") rather than explaining intent

**Why it matters:** Misleading documentation is worse than none — it actively misdirects the next developer.

---

## 3. Unresolved FIXME / TODO Labels

**Question:** Are there outstanding maintenance markers in active code paths?

**Signals:**
- `// FIXME:` comments in code that is being changed or depended upon
- `// TODO:` labels that have accumulated without a resolution plan
- Markers that reference issues or tickets that no longer exist

**Why it matters:** Unresolved markers indicate known debt that has been deferred. Changes in the vicinity increase the risk of compounding that debt.

---

## 4. Deprecated Function Usage

**Question:** Does the code depend on functions or APIs marked as deprecated?

**Signals:**
- `@deprecated` annotations on called methods
- Calls to functions that have known replacements in the codebase
- Use of APIs the browser or runtime vendor has flagged for removal

**Why it matters:** Deprecated code is load-bearing debt. Each change that touches it adds weight to a structure that is already scheduled for removal.

---

## 5. Mixed Levels of Abstraction

**Question:** Is code at the same level of abstraction in the same place?

**Signals:**
- A function that both orchestrates high-level steps and performs low-level string manipulation
- A module that contains both domain logic and direct API calls
- Variable names that mix domain vocabulary with implementation vocabulary

**Why it matters:** Mixed abstraction levels make code hard to reason about and hard to test in isolation.

---

## 6. Calculations Mixed with Decisions

**Question:** Are computations separated from the logic that uses their results?

**Signals:**
- Inline expressions computing values inside conditional branches
- Functions that both derive a value and act on it
- Business rules buried inside data transformation pipelines

**Why it matters:** Separating calculation from decision makes both independently testable and easier to change.

---

## 7. Low Cohesion

**Question:** Does each module or class do one thing?

**Signals:**
- A class with methods that serve unrelated concerns
- A file that is imported for very different reasons by different callers
- Functions that take boolean flags to select between distinct behaviors

**Why it matters:** Low cohesion means a change for one reason risks breaking an unrelated concern.

---

## 8. High Coupling

**Question:** Are dependencies between modules minimal and intentional?

**Signals:**
- Direct imports of concrete implementations rather than abstractions
- A module that reaches into the internals of another module
- Circular dependencies
- A change in one module requiring changes in many others

**Why it matters:** High coupling means a local change has non-local consequences.

---

## 9. Inconsistent Abstractions

**Question:** Are similar problems solved in similar ways throughout the codebase?

**Signals:**
- The same operation performed two different ways in nearby code
- An abstraction exists for a pattern but is not used consistently
- New code that reinvents something the codebase already has

**Why it matters:** Inconsistent abstractions increase cognitive load and create divergent maintenance paths.

---

## 10. Primitive Obsession

**Question:** Are domain concepts represented as domain types, or as raw primitives?

**Signals:**
- Strings used to represent IDs, statuses, or URL schemes without type aliases
- Booleans used to represent states that could be an enum or discriminated union
- Tuples or plain objects used where a named type would encode intent

**Why it matters:** Primitives carry no meaning. Replacing them with domain types makes invalid states unrepresentable.
