---
name: work-breakdown
description: Break down features and requirements into actionable, implementable tasks with clear scope and acceptance criteria. Use when planning implementation, organizing complex work, or creating task lists. Trigger phrases: "break down tasks", "create work plan", "organize implementation", "plan development"
---

# Work Breakdown

## Purpose

Break down large features, enhancements, or requirements into small, actionable tasks that can be implemented independently with clear success criteria and proper sequencing.

## When to Use

- Planning implementation of new features or enhancements
- Breaking down comprehensive requirements into development phases
- Creating task lists for development teams
- Organizing complex work into manageable, trackable pieces
- Planning sprints, iterations, or development milestones

## Key Capabilities

1. **Task Identification** — Identify discrete, implementable work units from high-level requirements
2. **Dependency Analysis** — Determine task order, relationships, and blocking dependencies
3. **Scope Definition** — Create clear, bounded task descriptions with acceptance criteria
4. **Phase Organization** — Group related tasks into logical implementation phases

## Approach

### 1. Read and Understand Requirements

- Review the complete requirements document
- Understand the full scope and all success criteria
- Identify major components and subsystems affected
- Note security requirements and constraints

### 2. Identify System Components

- What parts of the codebase are affected?
- Which APIs, services, databases, UIs need changes?
- What external systems or dependencies are involved?
- Are multiple platforms affected (web, desktop, mobile, CLI)?

### 3. Break into Phases

Organize work into logical phases:

**Phase 1: Architecture & Design**

- Design system architecture and data models
- Create sequence diagrams, data flow diagrams
- Define API contracts and interfaces
- Security threat modeling (if applicable)

**Phase 2: Implementation**

- Core functionality development
- Database schema changes
- API endpoint creation
- UI component development
- Integration work

**Phase 3: Testing**

- Unit test development
- Integration test development
- End-to-end test scenarios
- Security testing (if applicable)
- Cross-platform verification

**Phase 4: Documentation & Deployment**

- User documentation
- API documentation
- Deployment procedures
- Migration scripts (if needed)

### 4. Define Individual Tasks

Each task should be:

- **Right-sized**: Completable in 2-8 hours (not days)
- **Independent**: Can be worked on without blocking on other incomplete tasks (except explicit dependencies)
- **Testable**: Has clear acceptance criteria that can be verified
- **Specific**: Clear description of what needs to be done
- **Assigned**: Identified role or team (e.g., "Backend team", "Security team", "QA")

### 5. Identify Dependencies

- What tasks must be completed before others can start?
- Are there parallel work streams that can proceed independently?
- What external dependencies exist (library updates, third-party APIs)?
- What approval gates are needed (security review, design review)?

### 6. Validate Completeness

- Do the tasks cover all functional requirements?
- Are non-functional requirements addressed (performance, security, reliability)?
- Is testing adequately planned?
- Is documentation included?
- Are verification commands/tests defined?

## Task Template

Each task should follow this structure:

```markdown
**Task X.Y**: [Concise task title]

- **Description**: [What needs to be done]
- **Team/Role**: [Backend | Frontend | Security | QA | DevOps]
- **Estimated Duration**: [2-8 hours]
- **Dependencies**: [Task IDs that must complete first, or "None"]
- **Deliverables**: [Specific outputs or changes]
- **Acceptance Criteria**: [How to verify completion]
```

## Example: OAuth Authentication Feature

**Context**: Implement OAuth authentication with Google and GitHub providers for Bitwarden

**Work Breakdown**:

### Phase 1: Architecture & Design

**Task 1.1**: Design OAuth authentication flow

- **Description**: Create sequence diagrams for OAuth login, token refresh, and logout flows
- **Team/Role**: Backend architecture team
- **Estimated Duration**: 3-4 hours
- **Dependencies**: None
- **Deliverables**:
  - Authentication flow diagrams (Mermaid format)
  - State management design
  - Error handling strategy
- **Acceptance Criteria**:
  - Covers Google and GitHub OAuth flows
  - Includes token refresh and expiration handling
  - Addresses security principle P05 (Controlled Access to Vault Data)

**Task 1.2**: Design database schema for OAuth users and sessions

- **Description**: Define database schema for storing OAuth provider information, user mappings, and session tokens
- **Team/Role**: Backend architecture team
- **Estimated Duration**: 2-3 hours
- **Dependencies**: None
- **Deliverables**:
  - Schema definition (SQL)
  - Index specifications
  - Migration script outline
- **Acceptance Criteria**:
  - Normalized schema, no redundant data
  - Protected Data encrypted at rest (P02)
  - Supports multiple OAuth providers per user

**Task 1.3**: Security threat modeling for OAuth integration

- **Description**: Conduct threat modeling session to identify OAuth-specific security risks
- **Team/Role**: Security team (can use `Skill(threat-modeling)` if available)
- **Estimated Duration**: 3-4 hours
- **Dependencies**: Task 1.1 complete (need flow diagrams)
- **Deliverables**:
  - Security definition document
  - Threat catalog with STRIDE analysis
  - Mitigation requirements
- **Acceptance Criteria**:
  - Addresses token storage security
  - Covers CSRF, token replay, and session hijacking threats
  - Defines secure channel requirements (P01 Zero Knowledge maintained)

---

### Phase 2: Implementation

**Task 2.1**: Implement OAuth client library integration

- **Description**: Integrate OAuth client libraries for Google and GitHub, implement authorization code flow
- **Team/Role**: Backend implementation team
- **Estimated Duration**: 6-8 hours
- **Dependencies**: Task 1.1, Task 1.3 (need flow design and security requirements)
- **Deliverables**:
  - OAuth client wrapper classes
  - Configuration management for client IDs/secrets
  - Authorization request and callback handlers
- **Acceptance Criteria**:
  - Can initiate OAuth flow with Google and GitHub
  - Handles authorization callbacks correctly
  - Implements PKCE for additional security

**Task 2.2**: Implement user session management

- **Description**: Create session middleware to manage OAuth tokens, refresh logic, and user authentication state
- **Team/Role**: Backend implementation team
- **Estimated Duration**: 4-6 hours
- **Dependencies**: Task 1.2, Task 2.1 (need schema and OAuth client)
- **Deliverables**:
  - Session middleware
  - Token storage and retrieval logic
  - Automatic token refresh implementation
- **Acceptance Criteria**:
  - Sessions persist across requests
  - Tokens refresh automatically before expiration
  - Encrypted token storage (P02)

**Task 2.3**: Implement authentication middleware

- **Description**: Create middleware to protect routes requiring authentication, verify OAuth tokens
- **Team/Role**: Backend implementation team
- **Estimated Duration**: 3-4 hours
- **Dependencies**: Task 2.2 (need session management)
- **Deliverables**:
  - Authentication middleware
  - Route protection decorators
  - Unauthorized access handling
- **Acceptance Criteria**:
  - Protected routes require valid OAuth authentication
  - Returns 401 for unauthenticated requests
  - Returns 403 for unauthorized access attempts

**Task 2.4**: Create OAuth login UI components

- **Description**: Build UI components for OAuth provider selection and login flow
- **Team/Role**: Frontend implementation team
- **Estimated Duration**: 4-5 hours
- **Dependencies**: Task 2.1 (need backend OAuth endpoints)
- **Deliverables**:
  - Login page with provider buttons
  - OAuth callback handling UI
  - Error messaging UI
- **Acceptance Criteria**:
  - Displays Google and GitHub login options
  - Handles OAuth redirects properly
  - Shows clear error messages for failed authentication

**Task 2.5**: Implement user account linking

- **Description**: Allow existing users to link OAuth providers to their accounts
- **Team/Role**: Backend implementation team
- **Estimated Duration**: 5-6 hours
- **Dependencies**: Task 2.2, Task 2.3 (need session and auth middleware)
- **Deliverables**:
  - Account linking endpoints
  - Provider management UI backend
  - Unlinking functionality
- **Acceptance Criteria**:
  - Users can link multiple OAuth providers
  - Can unlink providers (if not sole login method)
  - Existing vault data remains accessible

---

### Phase 3: Testing

**Task 3.1**: Write OAuth integration unit tests

- **Description**: Create comprehensive unit tests for OAuth client, session management, and authentication middleware
- **Team/Role**: QA team / Backend team
- **Estimated Duration**: 5-6 hours
- **Dependencies**: Phase 2 implementation tasks complete
- **Deliverables**:
  - Unit test suite with >85% code coverage
  - Mock OAuth provider responses
  - Token lifecycle tests
- **Acceptance Criteria**:
  - All OAuth flows tested (login, refresh, logout)
  - Error scenarios covered (invalid tokens, expired tokens, provider errors)
  - Security checks validated (CSRF, token encryption)

**Task 3.2**: Create OAuth integration end-to-end tests

- **Description**: Build automated E2E tests using test OAuth providers
- **Team/Role**: QA team
- **Estimated Duration**: 6-8 hours
- **Dependencies**: Task 3.1, Phase 2 complete
- **Deliverables**:
  - E2E test suite for OAuth flows
  - Test OAuth provider configurations
  - Cross-browser test coverage
- **Acceptance Criteria**:
  - Complete login/logout flows tested
  - Account linking flows tested
  - Error handling verified
  - Tests run on Chrome, Firefox, Safari

**Task 3.3**: Manual cross-platform testing

- **Description**: Manually test OAuth on all Bitwarden clients (web, desktop, mobile)
- **Team/Role**: QA team
- **Estimated Duration**: 4-5 hours
- **Dependencies**: Phase 2 complete, Task 3.2 (automated tests pass)
- **Deliverables**:
  - Test execution report
  - Bug tracking for any issues found
  - Platform-specific behavior documentation
- **Acceptance Criteria**:
  - OAuth works on web vault, desktop apps (Windows, macOS, Linux), mobile (iOS, Android)
  - User experience consistent across platforms
  - No regressions in existing authentication

**Task 3.4**: Security testing and penetration testing

- **Description**: Conduct security-focused testing of OAuth implementation
- **Team/Role**: Security team
- **Estimated Duration**: 6-8 hours
- **Dependencies**: Task 3.1, Task 3.2 (functional testing complete)
- **Deliverables**:
  - Security test report
  - Penetration test findings
  - Mitigation verification
- **Acceptance Criteria**:
  - No high or critical security vulnerabilities found
  - All threat model mitigations verified
  - Token storage encryption validated
  - CSRF protections confirmed

---

### Phase 4: Documentation & Deployment

**Task 4.1**: Write OAuth setup documentation

- **Description**: Create user-facing documentation for setting up and using OAuth login
- **Team/Role**: Technical writing team
- **Estimated Duration**: 3-4 hours
- **Dependencies**: Phase 2 implementation complete
- **Deliverables**:
  - User guide for OAuth login
  - Provider configuration instructions
  - Troubleshooting guide
- **Acceptance Criteria**:
  - Covers Google and GitHub setup steps
  - Includes screenshots of login flow
  - Addresses common issues

**Task 4.2**: Create API documentation for OAuth endpoints

- **Description**: Document all OAuth-related API endpoints for developer reference
- **Team/Role**: Backend team / Technical writing
- **Estimated Duration**: 2-3 hours
- **Dependencies**: Phase 2 implementation complete
- **Deliverables**:
  - API endpoint documentation
  - Request/response examples
  - Error code reference
- **Acceptance Criteria**:
  - All endpoints documented with examples
  - Authentication requirements specified
  - Rate limits and constraints noted

**Task 4.3**: Prepare deployment and migration procedures

- **Description**: Create deployment scripts, database migrations, and rollout plan
- **Team/Role**: DevOps team
- **Estimated Duration**: 4-5 hours
- **Dependencies**: Phase 2 complete, Task 3.1-3.4 (all testing passed)
- **Deliverables**:
  - Database migration scripts
  - Deployment runbook
  - Rollback procedures
- **Acceptance Criteria**:
  - Migrations tested on staging environment
  - Zero-downtime deployment plan
  - Rollback tested and verified

---

**Why This Breakdown Works**:

- ✅ Each task is 2-8 hours (right-sized for tracking)
- ✅ Clear dependencies prevent blocking and enable parallel work
- ✅ Phases group related work logically
- ✅ Each task has specific team assignment and acceptance criteria
- ✅ Can be implemented and tested incrementally
- ✅ Security considerations integrated throughout
- ✅ Documentation and deployment explicitly planned

## Best Practices

### Do's

- ✅ **Right-size tasks** — 2-8 hours each, not full days or weeks
- ✅ **Clear acceptance criteria** — Must be testable and specific
- ✅ **Assign appropriate teams** — Match task to expertise
- ✅ **Group related tasks** — Organize into phases for clarity
- ✅ **Identify dependencies** — Make blocking relationships explicit
- ✅ **Ensure completeness** — All requirements covered, nothing orphaned
- ✅ **Include verification** — Testing and validation tasks for every feature
- ✅ **Plan documentation** — Technical and user docs are deliverables
- ✅ **Consider security** — Threat modeling and security testing included
- ✅ **Think cross-platform** — Bitwarden runs everywhere; plan for it

### Don'ts

- ❌ **Tasks too large** — >1 day tasks should be broken down further
- ❌ **Vague acceptance criteria** — "Make it work" is not testable
- ❌ **Circular dependencies** — Tasks shouldn't block each other in loops
- ❌ **Missing phases** — Don't skip design, testing, or documentation
- ❌ **Unclear deliverables** — Every task should produce something concrete
- ❌ **Ignoring platforms** — Don't forget mobile, CLI, browser extensions
- ❌ **Skipping security** — Security tasks are not optional at Bitwarden

## Output Format

Organize work breakdown in structured phases:

```markdown
# Work Breakdown: [Feature Name]

## Summary

- **Total Estimated Duration**: X-Y hours
- **Number of Tasks**: N tasks across M phases
- **Teams Involved**: [List of teams]
- **Critical Path**: [Key dependencies or bottlenecks]

---

## Phase 1: [Phase Name]

**Goal**: [What this phase accomplishes]

**Task 1.1**: [Task title]

- **Description**: [What needs to be done]
- **Team/Role**: [Who does this]
- **Estimated Duration**: [Hours]
- **Dependencies**: [Prerequisites or "None"]
- **Deliverables**: [Concrete outputs]
- **Acceptance Criteria**: [How to verify]

**Task 1.2**: [Next task]
...

---

## Phase 2: [Phase Name]

...

---

## Verification

After all phases complete, verify:

- [ ] All functional requirements implemented
- [ ] All non-functional requirements met
- [ ] All security requirements addressed
- [ ] All tests passing (unit, integration, E2E)
- [ ] Documentation complete and accurate
- [ ] Deployment procedures tested
```

## Integration with Requirements Elicitation

This skill works best when preceded by `requirements-elicitation` to ensure:

- All requirements are clearly understood before breaking down work
- Security and non-functional requirements are identified upfront
- Open questions are resolved before task creation
- Constraints and dependencies are known
