# Documentation Review Criteria

Common problems in code documentation. Reference this when evaluating documentation and inline comments.

---

## Documentation Criteria

### 1. Implementation Leakage
**Question:** Does the documentation describe *how* the implementation works internally rather than *what* it does?

**Good:** Describes behavior, contract, and outputs at the interface level
**Bad:** Names internal helpers, algorithms, parsing strategies, or data structures

**Example:**
<prefer>Returns false when either argument cannot be parsed as a valid URL</prefer>
<avoid>String inputs are parsed using URL.parse; invalid strings cause the function to return false</avoid>

**Why it matters:** Implementation details create maintenance burden — every internal refactor potentially invalidates the documentation, even when the external behavior is unchanged.

---

### 2. Staleness
**Question:** Does the documentation accurately reflect the current implementation?

**Good:** Every claim in the documentation matches actual behavior
**Bad:** Documentation references removed APIs, old names, or behaviors that were changed

**Example:** The implementation was changed to return null on expiry instead of throwing, but the documentation was not updated:
<avoid>Returns the cached value, or throws CacheExpiredError if the cache has expired</avoid>
<prefer>Returns the cached value, or null if the cache has expired</prefer>

**Why it matters:** Stale documentation is actively harmful — it misleads consumers and erodes trust in all documentation.

---

### 3. Verbosity vs. Scannability
**Question:** Would a reader need to read the implementation to understand how to use this unit?

**Good:** Complete but scannable — key behaviors surfaced, not buried in prose
**Bad:** Overly terse (missing critical behaviors forces the reader to read the implementation) or overly verbose (re-explaining the obvious buries what matters)

**Example:**
<avoid>Validates credentials.</avoid>
<avoid>Validates the provided credentials by checking whether the username exists in the system and, if it does, whether the supplied password matches the stored password hash. Returns true if both checks pass and false if either check fails.</avoid>
<prefer>
Returns false when the username does not exist or the password does not match.
Throws RateLimitError after five consecutive failures.
</prefer>

**Why it matters:** Documentation that can't be scanned forces readers to choose between reading the implementation (too terse) or excavating meaning from prose (too verbose) — both defeat the purpose of having documentation.

---

## Method and Function Criteria

### 4. Missing Behavioral Conditions
**Question:** Are all conditions that affect what the method returns (or whether it throws) documented?

**Good:** All guards, early returns, and edge-case behaviors are described in the documentation
**Bad:** Conditions exist in the implementation that a caller would need to know but can't discover without reading the code

**Example:**
<prefer>
Returns false when:
- Either argument cannot be parsed as a valid URL
- Either URL has an opaque origin (e.g. file:, data: schemes)
</prefer>
<avoid>Returns true if both URLs share the same origin; false otherwise</avoid>

**Why it matters:** Callers make decisions based on documentation. Missing conditions lead to incorrect usage or defensive code written by callers who don't trust the documentation.

---

### 5. Parameter Descriptions That Restate the Type
**Question:** Do parameter descriptions explain *purpose*, or just repeat information the type system already provides?

<prefer>canonical — The reference URL whose origin acts as the baseline</prefer>
<avoid>canonical — A string or URL representing the canonical address</avoid>

**Why it matters:** Type information is visible in the signature. Parameter docs should explain the role of the argument and how it affects behavior.

---

## Inline Comment Criteria

### 6. Restating the Code
**Question:** Does the comment say what the code already shows?

**Example:**
<prefer>
// file:, data:, and similar schemes produce opaque origins — reject to avoid false equality
if isOpaqueOrigin(url) { ... }
</prefer>
<avoid>
// Check if origin equals "null"
if url.origin == "null" { ... }
</avoid>

**Why it matters:** Comments that restate code add noise without value and dilute attention from comments that matter.

---

### 7. Redundancy With Documentation
**Question:** Does the inline comment repeat something already explained in the documentation?

**Good:** Inline comment explains implementation-level "why"; documentation explains interface-level "what"
**Bad:** Inline comment re-explains a condition or behavior already listed in the documentation

**Example:**
<avoid>
/** Returns false when the session has expired or the token cannot be found. */
function isSessionValid(session):
  ...
  if session is null or session.isExpired():
    // return false if session is expired or not found
    return false
</avoid>
<prefer>
/** Returns false when the session has expired or the token cannot be found. */
function isSessionValid(session):
  ...
  if session is null or session.isExpired():
    // clock skew during token rotation means expiry must be evaluated against server time
    return false
</prefer>

**Why it matters:** Duplication creates maintenance burden and makes readers wonder which version to trust when they diverge.

---

### 8. Missing "Why" on Non-Obvious Decisions
**Question:** Are there design choices in the implementation that would surprise a competent reader?

**Good:** Non-obvious choices are explained: why a guard is needed, why two concerns are combined, why an obvious approach was avoided
**Bad:** Surprising code with no explanation, leaving readers to infer intent

**Example:**
<avoid>if isOpaqueOrigin(canonicalUrl) or isOpaqueOrigin(suspectUrl) { ... }</avoid>
<prefer>
// file:, data:, and similar schemes produce opaque origins that serialize as "null".
// Two unrelated opaque-origin URLs would incorrectly compare equal — reject them.
if isOpaqueOrigin(canonicalUrl) or isOpaqueOrigin(suspectUrl) { ... }
</prefer>
