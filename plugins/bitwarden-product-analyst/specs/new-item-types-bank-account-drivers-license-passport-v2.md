---
title: New Item Types — Bank Account, Driver's License, Passport
status: Draft
created: 2026-03-02
author: [Author Name]
source: https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/2507866113/New+Item+Types+-+Bank+Account+Drivers+License+Passport
source-version: v11 (Wes Salmon, 2026-02-25)
---

> **Source coverage note:** The Confluence initiative page provided field definitions and resolved Q&A. It did not include Measurable Outcomes, competitive details, plan/role/client applicability tables, roadmap, team staffing, design docs, or product positioning. All absent sections are marked with owner attribution below.

# New Item Types: Bank Account, Driver's License, Passport

## Overview

**Goal**: Add three new structured vault item types — Bank Account, Driver's License, and Passport — to the Bitwarden Password Manager, giving users dedicated encrypted storage for sensitive financial and government identity documents.

> **[TBD — PM]**: A formal product vision statement ("In a few sentences, explain what the end state is for users and for the business") was not present in the source initiative page.

### Product Scope

**Supported on**: Cloud and Self-Hosted

> Source: Q&A confirmed "not Premium only." Deployment scope inferred as both Cloud and Self-Hosted based on standard vault item behavior.

**Plan applicability**:

|  | Type | Applicability |
|--|------|---------------|
| **Individual plans** | Free | Yes |
| | Premium | Yes |
| **Organization plans** | Free 2-person org | Yes |
| | Families | Yes |
| | Teams | Yes |
| | Enterprise | Yes |
| | Enterprise + Access Intelligence | Yes |
| **Provider-supported plans** | Teams | Yes |
| | Enterprise | Yes |
| | Enterprise + Access Intelligence | Yes |

> Source: Q&A stated "No" to Premium-only. Full plan table inferred — no explicit plan exclusions were stated.

**User role applicability**:

| Role | Applicability |
|------|---------------|
| Member | Yes — create, view, edit, delete own vault items |
| Admin | Yes — manage org-owned items in collections; can disable types via policy |
| Owner | Yes |
| Custom permission | Yes — subject to collection permissions |
| Provider Admin (Provider Portal) | Yes |
| Service User (Provider Portal) | Yes |

> Source: Q&A confirmed policy disable capability for admins. Full role table inferred — no role exclusions stated.

**Client applicability**:

| Client | Applicability |
|--------|---------------|
| Web app — Password Manager (end user) | Yes — primary creation/viewing surface |
| Web app — Admin Console | Yes — policy controls only |
| Web app — Secrets Manager | No |
| Web app — Provider Portal | Yes |
| Browser extension — Chrome, Firefox, Safari, Opera, Edge, Vivaldi, Brave, Tor | Yes — view/create/edit; no autofill in MVP |
| Mobile app — iOS and Android | Yes |
| Desktop app | Yes |
| CLI | Yes — standard CRUD (confirmed: "just normal") |

> Source: Q&A confirmed "just normal" CLI support and "not for MVP" autofill. All other surfaces inferred as standard vault item behavior.

**User Stories**:
- As an **individual user**, I want to store my bank account details in Bitwarden with proper field structure and masking so I can retrieve them securely without resorting to Secure Notes.
- As an **individual user**, I want to store my driver's license information so I have it handy when filling out rental, employment, or identity verification forms.
- As an **individual user**, I want to store my passport details so I can reference them when booking travel or completing border/identity checks.
- As an **organization member**, I want shared bank account items in collections so authorized teammates have secure access.
- As an **organization admin**, I want to disable one or more of these item types for my org if they fall outside our acceptable vault use policy.

---

## Measurable Outcomes

> **[TBD — PM]**: No measurable outcomes were defined in the Confluence initiative page. The table and strategic questions below must be completed before this spec is considered ready for implementation.

| Metric | Metric type | Data source |
|--------|-------------|-------------|
| [e.g., % of active vaults with ≥1 new item type within 90 days of launch] | Direct adoption metric | Bitwarden dB |
| [e.g., Reduction in Secure Note items per user after launch] | Direct adoption metric | Bitwarden dB |
| [e.g., Impact on free-to-premium conversion or retention] | Indirect business metric | [Stripe / Bitwarden dB] |

**Strategic questions** (to be answered by PM):
- Why are we doing this now, and why with DevClarity specifically?
- Does adding these types drive meaningful differentiation vs. 1Password/Dashlane?
- How does this contribute to business outcomes (retention, conversion, enterprise stickiness)?
- What are the risks (data sensitivity, support burden, scope of the DevClarity engagement)?

---

## Context & Background

### Current State

> Source: Confluence Overview + item selection rationale.

- Bitwarden currently supports four vault cipher types: Login, Secure Note, Card, and Identity.
- The Identity type captures some personal info (name, address, SSN, license number) but lacks structured fields for banking details, passport issuance metadata, or license class/jurisdiction — users today store these as unstructured Secure Notes, losing field masking, copy affordances, and clear labeling.
- This initiative is being delivered in collaboration with an external partner, **DevClarity**.
- Item type selection was based on a mix of competitive analysis and community feedback metrics, per an investigation by Don and Wes: [Google Sheets](https://docs.google.com/spreadsheets/d/1infkIgTEiSf1Bt3-sear9-Kakz-kjKwJAPxOX1ecHCc/edit?gid=0#gid=0).
- The three types share a similar structural shape (named fields + notes, no complex nesting), making them efficient to design and deliver together.
- **[TBD — PM]**: Customer quotes and direct user feedback supporting this initiative were not included in the source page.

### Competitive Context

> Source: Confluence referenced "compete analysis" but did not detail findings. Populated with known market context; PM to verify/expand.

- **1Password**: Supports Bank Account and Passport as native item types with structured fields. Does not offer Driver's License as a distinct type — license data lives in the Identity type.
- **LastPass**: **[TBD — PM]** — confirm from competitive analysis spreadsheet.
- **Keeper**: **[TBD — PM]** — confirm from competitive analysis spreadsheet.
- **Dashlane**: **[TBD — PM]** — confirm from competitive analysis spreadsheet.
- **Other reference products**: **[TBD — PM]**
- Could customers use existing tools? Technically yes via Secure Note, but without structured fields, masking, or copy affordances — meaningfully worse UX.

### Technical Context

- New `CipherType` enum values are required for each of the three item types in both `bitwarden/server` and `bitwarden/clients`.
- Field schemas follow the existing pattern of the Card and Identity cipher types.
- All field values are encrypted client-side using the vault key before storage or sync — consistent with all existing item types.
- The Account Type field on Bank Account introduces a single-select enum; this is a new field input type for vault items that needs design and implementation alignment across clients.

### Dependencies

- **DevClarity partnership**: Delivery sequence and team responsibilities must be clarified before sprint planning. Which parts does DevClarity own vs. Bitwarden engineering?
- **bitwarden/server must land before clients**: Schema, `CipherType` enum additions, and API validation changes in `bitwarden/server` must be deployed before client-side UI and integration testing can complete.
- **Existing item type restriction policy**: New types plug into an existing policy mechanism — no new policy infrastructure needed, but the policy UI in Admin Console needs updating.

---

## Requirements

### Functional Requirements

#### REQ-F-001: Bank Account item type

> Source: Confluence "Bank Account Item Fields" section, verbatim.

The system must support a "Bank Account" cipher type with the following fields:

| # | Field | Input type | Behavior |
|---|-------|-----------|----------|
| 1 | Bank Name | Open text | |
| 2 | Name on Account | Open text | |
| 3 | Account Type | Single-select | Options: Checking, Savings, Certificate of Deposit, Line of Credit, Investment/Brokerage, Money Market, Other |
| 4 | Account Number | Open text | **Hidden by default** (confirmed in Q&A) |
| 5 | Routing/Transit Number | Open text | |
| 6 | Branch/Institution Number | Open text | |
| 7 | PIN | Numeric only | **Hidden by default**; reject non-numeric input (confirmed in Q&A) |
| 8 | SWIFT Code | Open text | |
| 9 | IBAN | Open text | |
| 10 | Bank Contact Phone | Open text | |
| 11 | Notes | Open text | |

#### REQ-F-002: Driver's License item type

> Source: Confluence "Drivers License Item Fields" section, verbatim.

The system must support a "Driver's License" cipher type with the following fields:

| # | Field | Input type | Behavior |
|---|-------|-----------|----------|
| 1 | First Name | Open text | |
| 2 | Middle Name | Open text | |
| 3 | Last Name | Open text | |
| 4 | License Number | Open text | |
| 5 | Issuing Country | Open text | |
| 6 | Issuing State/Province | Open text | |
| 7 | Expiration Date | Date picker | Separate Day / Month / Year pickers |
| 8 | License Class | Open text | |
| 9 | Notes | Open text | |

#### REQ-F-003: Passport item type

> Source: Confluence "Passport Item Fields" section, verbatim.

The system must support a "Passport" cipher type with the following fields:

| # | Field | Input type | Behavior |
|---|-------|-----------|----------|
| 1 | Surname | Open text | |
| 2 | Given Name | Open text | |
| 3 | Date of Birth | Date picker | Separate Day / Month / Year pickers |
| 4 | Nationality | Open text | |
| 5 | Passport Number | Open text | |
| 6 | Passport Type | Open text | |
| 7 | Issuing Country | Open text | |
| 8 | Issuing Authority/Office | Open text | |
| 9 | Issue Date | Date picker | Separate Day / Month / Year pickers |
| 10 | Expiration Date | Date picker | Separate Day / Month / Year pickers |
| 11 | Notes | Open text | |

#### REQ-F-004: Shared behavior across all three types

- All three types must appear in the vault item creation picker alongside Login, Secure Note, Card, and Identity.
- All field values must be encrypted client-side before storage or sync.
- Hidden fields (Account Number, PIN) must support show/hide toggle and copy-to-clipboard without revealing the value.
- All types must support custom fields, attachments, favorites, and collection assignment — consistent with existing cipher types.
- All types must be searchable by item name and filterable in the vault list view.
- All types must be includeable in vault export (both encrypted and unencrypted formats).
- Emergency access: no special handling (confirmed in Q&A — standard behavior applies).

#### REQ-F-005: Organizational policy integration

> Source: Q&A — "Can this item type be disabled via policy by admins? We can add to existing policy."

- All three new types must be addable to the existing item type restriction policy in the Admin Console.
- When a type is restricted: members may not create new items of that type; existing items of that type remain accessible (read/edit/delete).
- Policy takes effect immediately for active sessions; at next sync for offline clients.

#### REQ-F-006: Standard CLI support

> Source: Q&A — "What level of CLI support is needed? Just normal."

- The CLI must support create, read, update, delete, and list for all three types using the existing `bw` command structure. No special CLI behaviors.

### Non-Functional Requirements

**Compatibility**:
- Older clients that do not recognize the new `CipherType` values must handle them gracefully — display as unknown type, no data loss or corruption, no sync failure.
- Import/export format must include the new types. Cross-compatibility with competitor export formats is deferred (noted as "just an FYI" in Q&A).

**Usability**:
- Hidden field behavior (Account Number, PIN) must be consistent with how Card number and security code masking work today.
- Date picker UX must be consistent across web, extension, mobile, and desktop.
- Accessibility: WCAG 2.1 AA.

### Required Work

- [ ] `bitwarden/server`: Add `CipherType` enum values for BankAccount, DriversLicense, Passport
- [ ] `bitwarden/server`: Define and validate field schemas for each new type
- [ ] `bitwarden/server`: Update API serialization and sync payload handling
- [ ] `libs/common` (`bitwarden/clients`): TypeScript models, type definitions, field name constants
- [ ] Web app — Password Manager: Create/edit/view UI for all three types
- [ ] Web app — Admin Console: Add new types to item type restriction policy UI
- [ ] Browser extension: Create/edit/view support for all three types (no autofill)
- [ ] Mobile app — iOS and Android: Create/edit/view support for all three types
- [ ] Desktop app: Create/edit/view support for all three types
- [ ] CLI: CRUD support for all three types
- [ ] Hidden field behavior for Account Number and PIN (Bank Account)
- [ ] Numeric-only enforcement for PIN field across all clients
- [ ] Date picker component for all date fields, consistent across all clients
- [ ] Vault export: include new types in encrypted and unencrypted export formats
- [ ] Graceful degradation on older clients for unknown `CipherType` values
- [ ] Self-hosted deployment compatibility verified
- [ ] Localization strings added to all affected clients
- [ ] Unit and integration tests for all new cipher types
- [ ] End-to-end tests for create/view/edit/delete on web and extension
- [ ] Documentation (user-facing help articles and developer docs)

### Out of Scope (MVP)

> Source: All confirmed in Q&A.

- **Autofill** — not for MVP; deferred to post-MVP phase.
- **Cross-item linking** — Bank Account items will not be linkable to Bank Login or Credit Card items.
- **Special emergency access handling** — standard emergency access behavior applies; no new logic.
- **Security report changes** — no changes to existing vault health reports.
- **External import format compatibility** — importing these types from competitor exports is deferred.

---

## Open Questions

### Resolved (from Confluence Q&A)

| # | Question | Answer | Source |
|---|----------|--------|--------|
| 1 | Premium only? | No — all plans | Q&A |
| 2 | Autofill support? | Not for MVP | Q&A |
| 3 | Import/export handling? | FYI only — no special MVP requirement | Q&A |
| 4 | Cross-link to bank login / credit card? | No | Q&A |
| 5 | Disable via admin policy? | Yes — add to existing policy | Q&A |
| 6 | CLI support level? | Standard (normal CRUD) | Q&A |
| 7 | Special emergency access? | No | Q&A |
| 8 | Which fields hidden by default? | Account Number and PIN (Bank Account only) | Q&A |
| 9 | Changes to vault reports? | No | Q&A |

### Still Open

| # | Question | Owner |
|---|----------|-------|
| 1 | Should License Number (Driver's License) or Passport Number be hidden by default? The Q&A only named Bank Account fields — Driver's License and Passport were not addressed. | PM + Design |
| 2 | What exactly does DevClarity own vs. Bitwarden engineering in this delivery? | PM |
| 3 | What is the exact Admin Console policy label for restricting these item types? | Design + Engineering |
| 4 | Single feature flag for all three types, or one per type? | Engineering |
| 5 | Are all three types releasing simultaneously or sequentially? | PM |
| 6 | Target release milestone / quarter? | PM |
| 7 | Post-MVP: should expiration dates surface in the Alert Center or vault health reports? | PM |

---

## Constraints & Limitations

### Technical Constraints
- **Must not break**: Vault sync for older clients that don't yet support the new `CipherType` values. Graceful degradation is required.
- **Must use**: Existing client-side encryption pattern — all field values encrypted with the vault key before sync.
- **Must maintain**: Backwards-compatible vault export format.
- **Platform constraints**: Date picker UX will vary across web, mobile, and extension; consistent UX is required but implementation approach may differ per platform.

### Business Constraints
- **Timeline**: **[TBD — PM]** — tied to DevClarity engagement schedule.
- **DevClarity dependency**: Scope of external partner involvement must be documented before sprint planning.
- **External dependencies**: **[TBD — PM]** — any contractual or SLA constraints from the DevClarity engagement.

### Existing Customer Impact & Migration
- **Deprecation**: None — no existing functionality is removed.
- **Migration**: Not applicable. Users currently storing these details in Secure Notes or Identity items are not automatically migrated.
- **Communication plan**: Standard blog post + release notes. Community forum announcement recommended given the community-feedback origin. **[TBD — PM]** to confirm channels and timing.

### Team Considerations
- **Teams needed**: **[TBD — PM/Engineering]** — pending DevClarity scope clarification. Likely: Vault, Mobile, CLI, DevOps (server schema), QA.
- **Data team**: Instrumentation needed to track adoption by cipher type. **[TBD — Engineering/Data]**
- **Infrastructure (DevOps/CloudOps)**: Server schema migration for new `CipherType` values; no expected scaling concerns.
- **Enablement work**: `bitwarden/server` changes must deploy before client UI can complete integration testing. Scoped to less than one quarter.
- **Iterative delivery assessment**: Three item types with similar shape — well-suited for a single milestone. No individual item appears to exceed small/medium scope. If DevClarity sequencing requires it, Bank Account could ship first with Driver's License and Passport in a subsequent milestone. **[TBD — PM]** to confirm.

---

## Success Criteria

### Definition of Done

- [ ] All Required Work items completed
- [ ] All three item types available on all supported clients (web PM, extension, mobile, desktop, CLI)
- [ ] Account Number and PIN fields hidden by default; show/hide and copy work correctly
- [ ] Account Type single-select renders all 7 options on all clients
- [ ] Date pickers work correctly; invalid dates produce errors, not silent truncation
- [ ] Autofill is not triggered for the new item types
- [ ] Admin Console policy UI allows restricting each new type
- [ ] Vault export includes all three types
- [ ] Older clients handle unknown `CipherType` values without crash or data loss
- [ ] Localization strings complete for all clients
- [ ] CI/CD passes on both `bitwarden/clients` and `bitwarden/server`
- [ ] Security review completed
- [ ] User-facing documentation published

### Acceptance Tests

1. **Bank Account creation**: Given a logged-in user on web vault, when they create a new item and select "Bank Account", then all 11 fields render with correct types, Account Number and PIN are masked, and the item saves and syncs to all other clients correctly.
2. **Driver's License creation**: Given a logged-in user, when they create a new Driver's License item, then all 9 fields render, the Expiration Date picker accepts valid dates and rejects invalid ones (e.g. Feb 30), and the item saves and syncs correctly.
3. **Passport creation**: Given a logged-in user, when they create a new Passport item, then all 11 fields render including three date pickers (DOB, Issue, Expiration), and the item saves and syncs correctly.
4. **PIN numeric enforcement**: Given a Bank Account item in edit mode, when a user types letters into the PIN field, then the input is rejected and only digits are accepted.
5. **Hidden field copy**: Given a Bank Account item with Account Number populated, when the user clicks copy without revealing the field, then the correct value is copied to the clipboard and was never shown in the UI.
6. **Policy enforcement**: Given an admin who has restricted "Bank Account" in the item type policy, when a member tries to create a Bank Account item, then creation is blocked with a clear error; the member's existing Bank Account items remain accessible.
7. **Old client compatibility**: Given a vault containing a Bank Account item, when an older client version that does not recognize the new CipherType loads the vault, then it shows the item as unknown type without crashing or corrupting other vault data.
8. **Autofill not triggered**: Given a Bank Account item in the vault, when the browser extension is active on any web page, then the new item types are not offered as autofill suggestions.
9. **CLI round-trip**: Given the CLI, when a user runs `bw create` with a Bank Account item JSON payload, then `bw get` returns the item with all fields intact, `bw edit` updates it successfully, and `bw delete` removes it.
10. **Vault export**: Given a vault with all three new item types, when the user exports (encrypted and unencrypted), then all items appear in the export with all fields represented.

### Verification Commands

```bash
# Client tests (bitwarden/clients)
cd apps/web && npm run test -- --testPathPattern=bank-account
cd apps/web && npm run test -- --testPathPattern=drivers-license
cd apps/web && npm run test -- --testPathPattern=passport

# Server tests (bitwarden/server)
dotnet test --filter "FullyQualifiedName~BankAccount"
dotnet test --filter "FullyQualifiedName~DriversLicense"
dotnet test --filter "FullyQualifiedName~Passport"

# Regression
npm run test:regression
```

---

## Security & Safety Considerations

### Data Classification
- **Vault Data**: Yes — all three types store highly sensitive PII: bank account numbers, routing numbers, PINs, passport numbers, license numbers, dates of birth. Must be treated with the same security posture as passwords.
- **Protected Data**: All field values encrypted client-side with the vault key before storage or transmission.
- **Data in Transit**: Standard TLS over existing sync transport. No changes required.

### Encryption & Sync
- **Encryption boundary**: Client-side only. No field value ever leaves the client in plaintext.
- **Key material involved**: User's vault key (same as all other cipher types). No new key types introduced.
- **Sync impact**: New `CipherType` values extend the sync payload. Older clients that don't recognize them must skip gracefully without breaking sync for other items.
- **Server knowledge**: Server stores only ciphertext. Server can observe that a `CipherType` enum value exists and its identifier, but cannot read any field values.

### Security Principles

- **P01 (Zero Knowledge)**: Fully maintained. Server sees only ciphertext and the `CipherType` identifier — never plaintext field values.
- **P02 (Locked Vault Security)**: All new item fields are inaccessible when the vault is locked. Consistent with all existing cipher types.
- **P03 (Trust Hierarchy)**: Org-owned items in collections respect existing collection permissions. Admins can restrict item type creation via policy. No new trust boundaries introduced.
- **P04 (Cryptographic Safety)**: No new cryptographic operations. New item types use the same AES-256 client-side encryption as all other vault items.
- **P05 (Controlled Access)**: Item access is governed by collection membership and org roles, consistent with existing behavior. Policy controls allow admins to restrict creation of new types org-wide.
- **P06 (Transparency)**: Standard item create/edit/delete audit log events should emit the new `CipherType` identifier so admins can observe usage. No new event types strictly required for MVP.

### Threat Considerations
- **Sensitive PII concentration**: These types aggregate high-value identity and financial data in one place. A client-side bug exposing field values in plaintext (e.g., logs, error messages) would be a significant trust violation. Hidden field behavior must be thoroughly tested.
- **Unencrypted export exposure**: When users export without encryption, all field values appear in plaintext. The existing export warning UI covers this, but reviewers should verify it applies to the new types.
- **Graceful degradation**: If an older client fails non-gracefully on an unknown `CipherType`, it could corrupt vault state or block access. Must be explicitly tested.
- **Formal threat modeling**: Not required for MVP — these types follow the same encryption and access patterns as existing items. If autofill is added post-MVP, a separate threat model is warranted.

### Data Validation
- **PIN field**: Numeric only — reject non-numeric input client-side on all platforms.
- **Date pickers**: Must validate for real calendar dates. Invalid dates must produce a clear error, not silent truncation or storage of an invalid value.
- **Open text fields**: Standard vault field length limits apply.

### Error Handling
- Unknown `CipherType` on older client: display as "Unknown Item Type"; do not crash, corrupt, or block vault load.
- PIN non-numeric input: "PIN must contain numbers only."
- Invalid date: "Please enter a valid date."
- Policy-blocked creation: "Your organization does not allow creating [Bank Account / Driver's License / Passport] items."
- No sensitive field values should appear in error logs or error messages.

### Organization & Collection Model Impact
- All three types behave like existing vault items in organizations: placeable in collections, subject to collection permissions.
- Admin/Owner can view and manage org-owned items per existing permissions.
- No new permission types or collection-level controls are introduced.
- Provider Admins have the same controls as Organization Admins for orgs they manage.

### Enterprise Policy Controls
- All three types will be added to the **existing item type restriction policy** — no new policy type required.
- When restricted: creation blocked; existing items remain accessible.
- Policy applies immediately on active sessions; at next sync for offline clients.
- Not retroactive — existing items are not deleted or hidden when the policy is first enabled.

### Feature Flag
- **Flag name**: **[TBD — Engineering]** (e.g., `item-type-bank-dl-passport` or one flag per type)
- **Rollout strategy**: Internal → Beta → GA
- **Kill switch behavior**: Flag should control creation UI visibility only — not data access. Items already created must remain accessible if the flag is disabled. **[TBD — Engineering]** to confirm.
- **Self-hosted**: Standard self-hosted flag propagation applies.

---

## UI/UX Considerations

> **[TBD — Design]**: No Figma files, UX flows, or design decisions were present in the source initiative page. All UI/UX sections below are based on functional requirements and standard Bitwarden patterns; Design must review and complete.

### User Interaction Flow

**Creating a Bank Account item (expected flow):**
1. User opens "New Item" and selects "Bank Account" from the type picker.
2. Form renders with all 11 fields; Account Number and PIN show masked/hidden state by default.
3. User fills in desired fields (all optional except item name).
4. User saves; item appears in vault list with a Bank Account icon.

**Viewing a hidden field:**
1. User opens a Bank Account item; Account Number is masked.
2. User clicks reveal → value shown in place.
3. User clicks copy → value copied to clipboard without being shown.

### Discoverability & Notifications
- **Discovery**: New types appear automatically in the item creation picker. Blog post and community forum announcement recommended given community-request origin. **[TBD — PM]** to confirm.
- **Alert Center**: Not in scope for MVP. Post-MVP candidate: surface expiration date warnings for Driver's License and Passport. **[TBD — PM]**
- **Notifications**: None required for MVP.

### Input/Output Format
- **Inputs**: All fields optional except item name. PIN accepts digits only. Date fields use Day/Month/Year pickers.
- **Outputs**: Success — item appears in vault list. Errors — shown inline on the offending field.

### Error Messages
- PIN non-numeric input: "PIN must contain numbers only."
- Invalid date: "Please enter a valid date."
- Policy-blocked creation: "Your organization does not allow creating [type] items."

### Accessibility
- All fields must have proper label associations for screen readers.
- Hidden field toggles must have descriptive `aria-label` attributes (e.g., "Show account number", "Hide account number").
- Date picker components must support keyboard navigation.
- Color contrast: WCAG 2.1 AA.

---

## Testing Strategy

### Unit Tests
- `CipherType` serialization/deserialization roundtrip for each new type
- PIN numeric-only enforcement
- Date picker: valid date accepted; invalid date rejected (e.g., Feb 30, month 13)
- Hidden field state: Account Number and PIN default to hidden; toggle and copy work correctly
- Policy enforcement: creation blocked when type is restricted

### Integration Tests
- Sync roundtrip: item created on web appears correctly on extension and mobile
- Old client compatibility: vault with new `CipherType` loads without error on a client that doesn't recognize it
- Collection access: org-owned Bank Account item respects collection permissions
- Export: all three types present and complete in encrypted and unencrypted vault exports

### End-to-End Tests
- Full create/view/edit/delete for each type on web vault
- Hidden field reveal and copy on web vault and browser extension
- CLI: `bw create`, `bw get`, `bw edit`, `bw delete` for each type
- Policy: admin restricts type → member blocked from creation → member's existing items still accessible

### Manual Test Scenarios
1. **Cross-client sync**: Create a Bank Account on web; verify all fields appear correctly on mobile and extension.
2. **Masked field clipboard**: Populate PIN; copy without revealing; paste into text editor and confirm value is correct.
3. **Invalid date**: Enter "February 30" as Expiration Date on Driver's License; confirm error appears and item cannot save.
4. **Export inspection**: Export vault containing all three types; open unencrypted export and verify all fields are present and correctly labeled.
5. **Older client graceful degradation**: Load a vault with new item types on a client version that predates this feature; confirm vault loads, unknown items are labeled as such, and no other items are affected.

### Performance Testing
- Verify sync performance is not materially degraded for large vaults after new cipher types are added to payloads. **[TBD — Engineering]** to define benchmark thresholds.

---

## Post-MVP Backlog

The following items were explicitly deferred or surfaced during analysis:

| Item | Source |
|------|--------|
| Autofill support for new item types | Q&A: "Not for MVP" |
| Cross-item linking (Bank Login ↔ Bank Account) | Q&A: "No" for MVP |
| External import format compatibility (competitor exports) | Q&A: "Just an FYI" |
| Expiration date alerts in Alert Center for Driver's License and Passport | Surfaced during analysis |
| Security vault health report awareness for new types | Q&A: "No" for MVP |

---

## Product Positioning

> **[TBD — PM + Product Marketing]**: Not present in source initiative page.

- **Feature naming**: "New Item Types" (working title). Should "Bank Account", "Driver's License", and "Passport" be grouped under a category label like "Identity Documents"? **[TBD — PM]**
- **User workflow impact**: Users no longer need Secure Notes as a workaround — dedicated types provide field labels, masking, copy affordances, and clear visual identity in the vault list.
- **Market differentiation**: Closes a gap vs. 1Password (Bank Account and Passport) and responds directly to community requests.
- **Demo update**: **[TBD — PM]** — confirm whether standard product demo should be updated.

---

## Design Documentation

> **[TBD — Design]**: None present in source initiative page.

- **User research**: [Link to research or community feedback analysis that informed type selection]
- **Figma / design files**: [Link to Figma designs, organized by release milestone]
- **UX flows**: [Link to user flow diagrams or interactive prototypes]

---

## References & Research

- [Confluence initiative page (primary source)](https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/2507866113/New+Item+Types+-+Bank+Account+Drivers+License+Passport) — v11, Wes Salmon, 2026-02-25
- [Competitive analysis investigation — Don & Wes](https://docs.google.com/spreadsheets/d/1infkIgTEiSf1Bt3-sear9-Kakz-kjKwJAPxOX1ecHCc/edit?gid=0#gid=0)
- [Bitwarden security definitions](https://contributing.bitwarden.com/architecture/security/definitions)
- [Existing CipherType definitions — TBD: link to bitwarden/clients source]
- [Existing item type restriction policy implementation — TBD: link to bitwarden/clients source]

## Related Work

- **GitHub Issues**: [TBD]
- **Pull Requests**: [TBD]
- **Previous features**: Identity cipher type, Card cipher type (reference implementations)
