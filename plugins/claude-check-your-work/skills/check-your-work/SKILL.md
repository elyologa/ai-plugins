---
name: check-your-work
description: Use agents to check your work. Run before marking any task complete.
---

# How to Check Your Code

Use a subagent — not your own judgment — to review your work. Independent agents provide a fresh perspective, which is critical for review.

## Tips for Effective Review

1. **Use subagents:** Don't try to review your work immediately after writing it. Use a Task agent for objectivity.
2. **When a specialized agent exists, use it:** These agents produce detailed, actionable feedback.
3. **Partition work by unit:** Subagents that work with individual units or files benefit from focused work.

## How to Review Structural Health

Procedure:

1. Identify changed files
2. Launch review agent
3. Apply recommendations
4. Address scope concerns
5. List ignored findings

**IMPORTANT:** Structural Health review is holistic; never partition it by unit or file.

### Step 1: Identify Changed Files

Identify the files you changed. If you changed 3 or more implementation files or more than 30 lines of code, continue. Otherwise, do not review structural health to check your work.

### Step 2: Launch Review Agent

`Agent(health-evaluator)` supports post-implementation review.

- Tell the agent you are performing a retrospective review.
- Provide the changed files or a description of the change.

### Step 3: Apply Recommendations

Review the agent's findings. Signals that create or maintain a hazard should be resolved before closing the task.

### Step 4: Address scope concerns

If a finding was ignored due to a scope concern, you must write a `FIXME` comment summarizing the ignored concern.

### Step 5: List ignored findings

List any findings that you did not address and why. Do not summarize. Be specific. Include filenames and line numbers of new `FIXME` comments.


## How to Review Documentation

Procedure:

1. Identify the unit
2. Launch review agent
3. Apply recommendations
4. List ignored findings


### Step 1: Identify the Unit

Determine the scope of the review. Documentation occurs in many forms. It could describe a code unit, such as method, class, module, or interface. It could be contained within a unit as a comment. It could be an independent document describing architecture, design, system evolution, or so on.

**IMPORTANT:** Updates to independent documents and to units intended for use outside of their enclosing module (aka "published" or "public" units) should *always* be reviewed.

### Step 2: Launch Review Agent

`Agent(documentation-evaluator)` is specialized for reviewing documentation! It can also tell you when documentation is out of date.

- Include the file path and unit name in the prompt.
- You can provide specific criteria for the agent to include in its review.

### Step 3: Apply Recommendations

Review the agent's feedback and update the documentation.

### Step 4: List ignored findings

List any findings that you did not address and why. Do not add `FIXME` comments for an ignored documentation finding.


## How to Review Unit Tests

Procedure:

1. Identify the test file
2. Launch review agent
3. Apply recommendations
4. Verify tests still pass
5. Address scope concerns
6. List ignored findings

### Step 1: Identify the Test File

Determine which test file you want reviewed. This should be a file you just wrote or modified.

Make sure your tests work! The agent will refuse to review tests that fail.

### Step 2: Launch Review Agent

`Agent(unit-test-evaluator)` is specialized for reviewing unit tests!

- When you launch the agent, include the unit you would like to test in the prompt.
- The agent can work with files, methods, classes, and specific tests.
- You can provide specific criteria for the agent to include in its review.

### Step 3: Apply Recommendations

Review the agent's feedback and apply recommended refactorings.

### Step 4: Verify Tests Still Pass

After refactoring, run the test suite to ensure:
- All tests still pass
- Test coverage remains the same
- Test descriptions are clear

### Step 5: Address scope concerns

If a finding was ignored due to a scope concern, you must write a `FIXME` comment summarizing the ignored concern.

### Step 6: List ignored findings

List any findings that you did not address and why. Include filenames and line numbers of new `FIXME` comments.
