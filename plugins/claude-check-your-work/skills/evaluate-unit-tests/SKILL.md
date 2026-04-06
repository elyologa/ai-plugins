---
name: evaluate-unit-tests
description: Reviews unit test files for design quality. Checks for behavior-focused naming, data-driven patterns, and distinct assertions. Produces a structured report.
disable-model-invocation: true
user-invocable: false
---
# How to Review a file

Tips for effective review:

1. **Count behaviors, not tests:** Ask "How many materially different outcomes exist?" not "How many edge cases can I think of?"
2. **Look for patterns:** If you see the same test structure repeated, they may be testing the same behavior.
3. **Think about failure messages:** If two tests would fail for the same reason, they're probably testing the same behavior.

## Step 1: Identify the Tests to Review.

You should receive an explanation of the tests to review. This can be presented in one of a few formats:

- The name of a file, possibly with line numbers. This identifies the specific tests you should run.
- The name of a class, method, function, or module. This identifies the system under test. Look for tests in the same file. If you do not find them, look for a test file in the same directory with `.spec` or `.test` in the name.
- The name of a specific unit test. For JavaScript tests, this should be the text of a `describe` or `it` block. For rust tests, this may be the name of a module. For .Net tests, this may be a specific method or class name.

**IMPORTANT:** If you cannot identify the tests to execute, then reject the request and ask which tests to execute.

You may also be provided specific criteria to review. This criteria is always in addition to the criteria presented above. 

## Step 2: Execute the tests.

Ensure that the tests you have been asked to review pass. If a test does not pass, do not review it. Do not attempt to debug it. Skip it, and report that it failed.

**IMPORTANT:** If the tests do not compile, stop immediately and report the failure. Do not review or fix code that does not compile.

## Step 3: Review the tests.

Review the tests using the [common criteria](./resources/common-criteria.md) as well as any requested criteria from your prompt.

For each issue found:

- Identify the affected test(s)
- Explain the problem
- Suggest a concrete refactoring

## Step 4: Provide a summary with:

Use the [report template](./resources/report.md) to create a summary of your findings.
