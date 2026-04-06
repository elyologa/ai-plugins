# Review Criteria

This is a guide for identifying common problems in unit tests. Reference it when evaluating unit tests to ensure they meet baseline expectations.

## 1. Over-fitting Prevention
**Question:** Are tests coupled to implementation details or testing behaviors?

**Good:** Tests verify observable behaviors and outcomes
**Bad:** Tests verify internal state, method calls, or implementation details

**Example of over-fitting:**
```typescript
// BAD - Testing implementation detail
it("calls the private _calculateTotal method", () => {
  const spy = jest.spyOn(service as any, '_calculateTotal');
  service.checkout();
  expect(spy).toHaveBeenCalled();
});

// GOOD - Testing behavior
it("calculates correct total when checking out", () => {
  service.addItem({ price: 10 });
  const total = service.checkout();
  expect(total).toBe(10);
});
```

## 2. Distinct Behaviors
**Question:** Does each test exercise a materially different behavior?

**Good:** Each test represents a different outcome or decision path
**Bad:** Multiple tests verify the same behavior with trivial input variations

**How to identify distinct behaviors:**
- Count the number of materially different outcomes
- If you have N similar tests but only 2-3 distinct behaviors, consolidate
- Ask: "If this test fails, does it tell me something different than the other tests?"

**Example of duplicate behaviors:**
```typescript
// BAD - Testing same behavior repeatedly
it("returns false for negative numbers", () => {
  expect(isPositive(-1)).toBe(false);
});
it("returns false for negative decimals", () => {
  expect(isPositive(-0.5)).toBe(false);
});
it("returns false for large negative numbers", () => {
  expect(isPositive(-1000)).toBe(false);
});

// GOOD - Data-driven test for single behavior
it.each([
  [-1, "negative integer"],
  [-0.5, "negative decimal"],
  [-1000, "large negative number"],
])("returns false for negative numbers: %s", (input) => {
  expect(isPositive(input)).toBe(false);
});
```

## 3. Data-Driven Opportunities
**Question:** Can similar tests be combined using data-driven testing?

**Indicators for data-driven testing:**
- Multiple tests with identical structure
- Only input values or test descriptions differ
- Testing the same behavior with different edge cases

**Frameworks support:**
- **Jest:** `test.each()` or `it.each()`

**Example refactoring:**
```typescript
// BEFORE - 7 separate tests
it("removes items for chrome-extension URLs", async () => {
  await handler.update("chrome-extension://abc/page.html");
  expect(removeItems).toHaveBeenCalled();
});
it("removes items for moz-extension URLs", async () => {
  await handler.update("moz-extension://abc/page.html");
  expect(removeItems).toHaveBeenCalled();
});
// ... 5 more similar tests

// AFTER - 1 data-driven test
it.each([
  ["chrome-extension://abc/page.html", "chrome-extension"],
  ["moz-extension://abc/page.html", "moz-extension"],
  ["safari-web-extension://abc/page.html", "safari-extension"],
  ["about:blank", "about page"],
  ["file:///path/file.html", "file URL"],
])("removes items for non-web URLs: %s", async (url) => {
  await handler.update(url);
  expect(removeItems).toHaveBeenCalled();
});
```

### Common Anti-patterns

1. **The "Cover Everything" Anti-pattern:**
   - Writing separate tests for trivial input variations
   - Testing same logic path repeatedly
   - **Fix:** Identify the distinct behaviors, use data-driven for variants

2. **The "Implementation Mirror" Anti-pattern:**
   - Tests that mirror code structure (one test per method)
   - Tests that verify internal calls rather than outcomes
   - **Fix:** Focus on user-observable behaviors

3. **The "Copy-Paste" Anti-pattern:**
   - Multiple tests with only input values changed
   - Identical assertion patterns across tests
   - **Fix:** Use data-driven testing for variants

3. **The "Testing a Mock" Anti-pattern:**
   - Mocks perform computation
   - Test asserts the value computed by the mock
   - **Fix:** Use a fake instead of a mock

4. **The "Deferred Assertion" Anti-pattern:**
   - A test uses `expect.anything()` or a FIXME comment in place of a precise value assertion
   - The behavioral weight falls entirely on a negative assertion (`not.toHaveBeenCalledWith`)
   - **Check first:** Does the system under test compute the asserted value via an injected dependency? If so, mock it and assert precisely rather than deferring.
