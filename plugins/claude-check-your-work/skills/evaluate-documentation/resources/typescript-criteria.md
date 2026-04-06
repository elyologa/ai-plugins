# TypeScript Documentation Criteria

TypeScript-specific documentation guidance. Apply these criteria in addition to the general criteria when reviewing TypeScript code.

---

## JSDoc Tag Structure

### Parameter Tags
Use `@param name - Description`, not `@param {Type} name - Description`.

TypeScript owns the type; JSDoc owns the behavioral description. The type annotation is redundant when TypeScript types are present and adds maintenance burden — it must be updated separately whenever the type changes.

```typescript
// PREFER
@param canonical - The reference URL whose origin acts as the baseline

// AVOID
@param {string | URL} canonical - A string or URL representing the canonical address
```

---

### Returns Tags
Include `@returns` only when the return value's meaning is non-obvious from the signature. Omit it for `void` and cases where the return is self-evident from the method name and types.

```typescript
// PREFER - non-obvious return, worth documenting
/** @returns true if both URLs share the same origin and neither has an opaque origin */
function isSameOrigin(canonical: string | URL, suspect: string | URL): boolean

// AVOID - self-evident, adds noise
/** @returns void */
function initialize(): void
```

**`Promise<void>`:** The resolved value is empty, but error conditions are not. Document what causes the promise to reject.

```typescript
// PREFER
/**
 * @throws {CryptoError} if the key material cannot be derived
 * @throws {StorageError} if the vault cannot be written
 */
async function unlock(masterPassword: string): Promise<void>
```

**`Observable<T>`:** Document when the observable emits and when it completes — callers need this to subscribe correctly.

```typescript
// PREFER
/**
 * Emits the current vault state on subscription and on each subsequent change.
 * Completes when the vault is locked.
 */
function vault$(): Observable<VaultState>
```

**`Signal<T>` and `WritableSignal<T>`:** Document what the signal's value represents and what causes it to update — callers need this to understand when a read will reflect a change.

```typescript
// PREFER
/**
 * The current lock state of the vault. Updates whenever the vault is locked or unlocked.
 */
readonly locked: Signal<boolean>;

/**
 * The active account, or null if no account is selected. Updates on account switch or logout.
 */
activeAccount: WritableSignal<Account | null>;
```

---

### Inline Type Annotations
Don't duplicate TypeScript types inside JSDoc tags. Let the type system own types entirely.

```typescript
// AVOID - @type is redundant when the variable is already typed
/** @type {string} */
const name: string = "foo";

// PREFER - no JSDoc needed here at all
const name: string = "foo";
```
