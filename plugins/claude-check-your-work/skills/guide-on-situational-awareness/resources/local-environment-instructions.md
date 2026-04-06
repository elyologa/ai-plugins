# How to explore the local environment of a change

A phased approach for systematically exploring the code immediately surrounding a change. Use this when you need to understand the local mechanisms, patterns, and data flow before deciding how to proceed.

## Step 1: Identify Patterns

When you find the code related to your change, pay close attention to:

1. **decision logic** - Which branches or values determine how the program behaves?
2. **flags/properties** - What configuration options exist?
3. **similar features** - How do other parts of the code handle similar cases?
4. **non-local effects** - What upstream or downstream dependencies impact how this code functions?

## Step 2: Understand Each Pattern's Role

Before tracing, list what each pattern controls architecturally — its semantics, trigger conditions, and scope of usage. This informs how far your trace needs to go. Ground your decisions and evaluations about pattern relevancy in the roles played by the code.

## Step 3: Trace the Mechanism

Once you identify a potentially relevant pattern, trace **how it works** in detail:

1. **Find all usage locations** - Where is this pattern checked/applied?
2. **Understand the data flow** - How does the check get triggered? What's the call chain?
3. **Identify variations** - Are there different code paths? Optional parameters?
4. **Look for edge cases** - What happens in special scenarios?

**Watch Out For:**
- **Optional parameters** that might default differently than expected
- **Multiple code paths** that might not all check the same thing
- **The full lifecycle** - When are things initialized vs updated?
