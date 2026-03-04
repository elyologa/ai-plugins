---
title: New Item Types — Bank Account, Driver's License, Passport
status: Draft
created: 2026-03-02
author: [Author Name]
source: https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/2507866113/New+Item+Types+-+Bank+Account+Drivers+License+Passport
---

# New Item Types: Bank Account, Driver's License, Passport

## Overview

**Goal**: Add three new structured vault item types — Bank Account, Driver's License, and Passport — to the Bitwarden Password Manager, giving users dedicated, encrypted storage for sensitive financial and identity documents alongside their existing vault items.

### Product Scope

**Supported on**: Cloud and Self-Hosted

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

> Confirmed: these are not Premium-only. All plans have access.

**User role applicability**:

| Role | Applicability |
|------|---------------|
| Member | Yes — can create, view, edit, delete own items |
| Admin | Yes — can manage org-owned items in collections |
| Owner | Yes |
| Custom permission | Yes — subject to collection permissions |
| Provider Admin (Provider Portal) | Yes |
| Service User (Provider Portal) | Yes |

> Admins can disable these item types org-wide via an existing policy extension (see Enterprise Policy Controls).

**Client applicability**:

| Client | Applicability |
|--------|---------------|
| Web app — Password Manager (end user) | Yes — primary surface |
| Web app — Secrets Manager | No |
| Web app — Admin Console | Yes — policy management only |
| Web app — Provider Portal | Yes |
| Browser extension — Chrome, Firefox, Safari, Opera, Edge, Vivaldi, Brave, Tor | Yes (view/create/edit; autofill not in MVP) |
| Mobile app — iOS and Android | Yes |
| Desktop app | Yes |
| CLI | Yes — standard CRUD support |

**User Stories**:
- As an **individual user**, I want to store my bank account details securely in Bitwarden so I can retrieve them when needed without writing them down.
- As an **individual user**, I want to store my driver's license information so I have it available when filling out forms or rental agreements.
- As an **individual user**, I want to store my passport details securely so I can reference them when booking travel or completing identity verification.
- As an **organization member**, I want to store shared bank account information in a collection so authorized team members have secure access.
- As an **organization admin**, I want to disable these item types via policy if they fall outside our acceptable use policy for the vault.

---

## Measurable Outcomes

> [TBD — PM to define before implementation begins]

| Metric | Metric type | Data source |
|--------|-------------|-------------|
| % of active vaults containing at least one Bank Account, Driver's License, or Passport item | Direct adoption metric | Bitwarden dB |
| Number of new item type creations in the first 90 days post-launch | Direct adoption metric | Bitwarden dB |
| [Retention/churn improvement for free users who adopt new item types?] | Indirect business metric | [TBD] |

**Strategic questions** (answers from Confluence investigation):
- **Why are we doing this now?** Based on competitive analysis and community feedback metrics; partners at DevClarity identified this as a prioritized gap.
- **Does this drive differentiation for Bitwarden?** Yes — competitors (1Password, Dashlane) already offer richer identity item types; adding these closes a meaningful usability gap and responds directly to community requests.
- **What are the risks?** These item types contain highly sensitive PII (passport numbers, banking credentials). Any implementation error that exposes this data in plaintext would be a significant trust violation. Storage encryption is non-negotiable.

---

## Context & Background

### Current State
- Bitwarden currently supports four vault item types: Login, Secure Note, Card, and Identity.
- The Identity type captures some personal information (name, address, phone, SSN, license number) but lacks structured fields for banking details, passport-specific data, or driver's license issuance metadata.
- Users today store bank account numbers and passport details either as Secure Notes (unstructured) or awkwardly in Identity items, losing field-level affordances (masking, copy-to-clipboard, field labels).
- Community forums and customer feedback have surfaced repeated requests for structured item types for financial and government identity documents.
- This work is being delivered in collaboration with DevClarity.
- Source investigation by Don and Wes: [Google Sheets](https://docs.google.com/spreadsheets/d/1infkIgTEiSf1Bt3-sear9-Kakz-kjKwJAPxOX1ecHCc/edit?gid=0#gid=0)

### Competitive Context
- **1Password**: Supports Bank Account and Passport item types natively with structured fields; does not include Driver's License as a distinct type.
- **LastPass**: [TBD — from competitive analysis]
- **Keeper**: [TBD — from competitive analysis]
- **Dashlane**: [TBD — from competitive analysis]
- **Other reference products**: [TBD]
- Could customers use existing tools? Technically yes, via Secure Note, but without structured field support, masked values, or copy affordances. User experience is meaningfully worse.

### Technical Context
- New `CipherType` enum values will be required for each of the three item types.
- Field schemas will follow the existing pattern of Card and Identity cipher types in `libs/common`.
- All field values are encrypted client-side using the vault key before being stored or synced, consistent with all existing item types.
- The `bitwarden/server` will need schema additions to persist and validate the new types. Clients will need UI, model, and service changes.
- The three new types share a similar structural shape (structured fields + notes), making them well-suited for parallel implementation.

### Dependencies
- DevClarity collaboration — delivery timeline tied to external partner work.
- Existing organizational policy infrastructure — the new types will plug into the existing "item type restriction" policy rather than requiring a new policy type.
- Cross-repo dependencies: `bitwarden/server` schema and API changes must land before client work can be completed and tested end-to-end.

---

## Requirements

### Functional Requirements

#### REQ-F-001: Bank Account Item Type

The system must support a new "Bank Account" vault item type with the following fields:

| # | Field | Type | Notes |
|---|-------|------|-------|
| 1 | Bank Name | Open text | |
| 2 | Name on Account | Open text | |
| 3 | Account Type | Single-select | Options: Checking, Savings, Certificate of Deposit, Line of Credit, Investment/Brokerage, Money Market, Other |
| 4 | Account Number | Open text | **Hidden by default** |
| 5 | Routing/Transit Number | Open text | |
| 6 | Branch/Institution Number | Open text | |
| 7 | PIN | Numeric only | **Hidden by default** |
| 8 | SWIFT Code | Open text | |
| 9 | IBAN | Open text | |
| 10 | Bank Contact Phone | Open text | |
| 11 | Notes | Open text | |

#### REQ-F-002: Driver's License Item Type

The system must support a new "Driver's License" vault item type with the following fields:

| # | Field | Type | Notes |
|---|-------|------|-------|
| 1 | First Name | Open text | |
| 2 | Middle Name | Open text | |
| 3 | Last Name | Open text | |
| 4 | License Number | Open text | |
| 5 | Issuing Country | Open text | |
| 6 | Issuing State/Province | Open text | |
| 7 | Expiration Date | Date picker | Day / Month / Year pickers |
| 8 | License Class | Open text | |
| 9 | Notes | Open text | |

#### REQ-F-003: Passport Item Type

The system must support a new "Passport" vault item type with the following fields:

| # | Field | Type | Notes |
|---|-------|------|-------|
| 1 | Surname | Open text | |
| 2 | Given Name | Open text | |
| 3 | Date of Birth | Date picker | Day / Month / Year pickers |
| 4 | Nationality | Open text | |
| 5 | Passport Number | Open text | |
| 6 | Passport Type | Open text | |
| 7 | Issuing Country | Open text | |
| 8 | Issuing Authority/Office | Open text | |
| 9 | Issue Date | Date picker | Day / Month / Year pickers |
| 10 | Expiration Date | Date picker | Day / Month / Year pickers |
| 11 | Notes | Open text | |

#### REQ-F-004: Common behavior across all three types
- All three types must appear in the vault item creation flow alongside Login, Secure Note, Card, and Identity.
- All field values must be encrypted client-side before storage or sync, consistent with existing item types.
- Hidden fields (Account Number, PIN) must support the show/hide toggle and copy-to-clipboard without revealing the value in plain text.
- All three types must be searchable by name within the vault.
- All three types must be filterable in the vault item list view.
- All three types must support custom fields (as with other item types).
- All three types must support attachments (as with other item types).
- All three types must support collection assignment for org-owned items.
- All three types must be included in vault export (encrypted export).

#### REQ-F-005: Standard CLI support
- The CLI must support create, read, update, delete, and list operations for all three new item types using the existing `bw` command structure.
- No special CLI-specific behaviors beyond standard item type support.

#### REQ-F-006: Organizational policy integration
- Admins must be able to disable one or more of the new item types for their organization via the existing item type restriction policy.
- When a type is disabled by policy, members cannot create new items of that type; existing items remain visible and editable but creation is blocked.

### Non-Functional Requirements

**Compatibility**:
- All three new `CipherType` values must be handled gracefully by older clients that don't yet recognize them (display as unknown type, do not corrupt data).
- Import/export format must be updated to represent the new types. Cross-compatibility with other password managers' export formats is a post-MVP consideration, noted as an FYI.

**Usability**:
- Hidden field values (Account Number, PIN) must behave consistently with how the Card item type handles the card number and security code today.
- Date picker UX for Expiration/Issue/Date of Birth fields must be consistent across clients.
- Accessibility requirements: WCAG 2.1 AA compliance.

### Required Work

- [ ] `bitwarden/server`: Add new `CipherType` enum values (BankAccount, DriversLicense, Passport)
- [ ] `bitwarden/server`: Add field schema definitions and validation for each new type
- [ ] `bitwarden/server`: Update API serialization/deserialization to support new types
- [ ] `libs/common`: Add TypeScript models and type definitions for new cipher types
- [ ] `libs/common`: Add field name constants and metadata for new types
- [ ] Web vault UI — Password Manager end user: Create/edit/view UI for all three types
- [ ] Web app — Admin Console: Expose new type controls in item type restriction policy
- [ ] Browser extension: Create/edit/view support for all three types
- [ ] Mobile app — iOS and Android: Create/edit/view support for all three types
- [ ] Desktop app: Create/edit/view support for all three types
- [ ] CLI (`apps/cli`): CRUD support for all three types
- [ ] Hidden field behavior for Account Number and PIN (Bank Account)
- [ ] Date picker component for Expiration/Issue/DOB fields (consistent across clients)
- [ ] Self-hosted deployment compatibility verified
- [ ] Localization strings added to all affected clients
- [ ] Vault export: include new types in encrypted and unencrypted export formats
- [ ] Organizational policy integration: new types hookable into existing item type restriction policy
- [ ] Unit and integration tests for all new cipher types and field validation
- [ ] End-to-end tests covering create/view/edit/delete for each type on web and extension
- [ ] Documentation (user-facing help articles and developer docs)

### Out of Scope (MVP)

- **Autofill** — new item types will not support autofill in the browser extension or mobile app for MVP.
- **Cross-item linking** — bank login items and bank account items will not be linkable to each other.
- **Special emergency access handling** — no changes to emergency access behavior for these types.
- **Security report changes** — existing reports (exposed passwords, reused passwords, etc.) will not be modified for the new item types.
- **External import format compatibility** — importing Bank Account or Passport data from competitor exports is deferred.

---

## Open Questions

> All questions below have been resolved per the Confluence source document. Capturing here for traceability.

1. ~~Is this a Premium-only item type?~~ **Resolved: No — all plans.**
2. ~~How should autofill support this item type?~~ **Resolved: Not for MVP.**
3. ~~How should this item type support import/export?~~ **Resolved: FYI — no special handling required for MVP; standard vault export inclusion.**
4. ~~Should related items (bank login, credit card) be cross-linkable?~~ **Resolved: No.**
5. ~~Can admins disable via policy?~~ **Resolved: Yes — add to existing item type restriction policy.**
6. ~~What level of CLI support?~~ **Resolved: Standard (normal CRUD).**
7. ~~Does this need special emergency access?~~ **Resolved: No.**
8. ~~Do certain fields need to be hidden by default?~~ **Resolved: Yes — Account Number and PIN (Bank Account only).**
9. ~~Any changes to vault reports?~~ **Resolved: No.**

**Still open:**
- [ ] Should Driver's License number or Passport number be hidden by default, like Account Number and PIN? The Confluence page only calls out Bank Account fields — needs design/PM confirmation.
- [ ] Should expiration dates on Driver's License and Passport surface in any kind of expiration alert or vault health report (post-MVP)?
- [ ] What is the exact policy name and UI label for disabling these item types in the Admin Console?
- [ ] Does the DevClarity collaboration affect delivery sequence or client priority ordering?

---

## Constraints & Limitations

### Technical Constraints
- **Must not break**: Existing vault sync for clients that do not yet recognize the new `CipherType` values. Older clients must handle unknown types gracefully without data loss or corruption.
- **Must use**: Existing cipher encryption pattern — all field values encrypted client-side using the vault key before sync.
- **Must maintain**: Backwards compatibility for vault export format. Items must round-trip cleanly.
- **Platform limitations**: Date picker UX may differ across web, mobile, and extension; consistent UX across platforms is a requirement but implementation approach may vary.

### Business Constraints
- **Timeline**: [TBD — tied to DevClarity collaboration schedule]
- **Resources**: DevClarity is an external delivery partner; internal team involvement scope TBD.
- **External dependencies**: DevClarity partnership scope and responsibilities must be clarified before work begins.

### Existing Customer Impact & Migration
- **Deprecation**: None — no existing functionality is being removed.
- **Migration plan**: Not applicable. Users currently storing these details in Secure Notes or Identity items are not automatically migrated; they can manually create new typed items.
- **Communication plan**: Standard release notes and blog post. Community forums announcement recommended given this feature was driven by community requests. No proactive user email required.

### Team Considerations
- **Teams needed**: Vault (primary), Platform, Mobile, CLI, DevOps (server schema migration), QA.
- **Data team**: Instrumentation needed to track adoption of new item types (item creation events by type).
- **Infrastructure (DevOps/CloudOps)**: Server schema migration for new cipher types; no expected scaling concerns.
- **Enablement work**: Server-side `CipherType` additions and field schema must be deployed before client-side UI work can be fully tested. This is scoped to less than one quarter.
- **Alternative solutions explored**: Investigated whether existing Identity or Secure Note types could be extended rather than adding new types. Determined that new types provide better UX (structured fields, field masking, clear labels) and are consistent with the competitor approach.

---

## Success Criteria

### Definition of Done

- [ ] All Required Work items completed
- [ ] All functional requirements implemented
- [ ] Account Number and PIN fields are hidden by default and behave consistently with Card number masking
- [ ] New item types available on all supported clients (web, extension, mobile, desktop, CLI)
- [ ] New item types excluded from autofill
- [ ] Admin policy controls for item type restriction include the three new types
- [ ] Vault export includes new item types
- [ ] No regressions in existing item types (Login, Secure Note, Card, Identity)
- [ ] Old clients handle unknown `CipherType` values gracefully — no data loss
- [ ] Code builds and passes CI/CD pipelines on both `bitwarden/clients` and `bitwarden/server`
- [ ] Security review completed
- [ ] Localization strings complete
- [ ] Documentation complete and reviewed

### Acceptance Tests

1. **Create Bank Account**: Given a logged-in user, when they create a new vault item and select "Bank Account", then all 11 fields are displayed with correct types, Account Number and PIN are hidden by default, and the item saves and syncs correctly.
2. **Create Driver's License**: Given a logged-in user, when they create a new Driver's License item, then all 9 fields are present including a date picker for Expiration Date, and the item saves and syncs correctly.
3. **Create Passport**: Given a logged-in user, when they create a new Passport item, then all 11 fields are present including date pickers for Date of Birth, Issue Date, and Expiration Date, and the item saves and syncs correctly.
4. **Hidden fields**: Given a Bank Account item with Account Number and PIN populated, when the user views the item, then both fields are masked; when the user clicks the reveal toggle, the value is shown; when the user clicks copy, the value copies to clipboard without being revealed in the UI.
5. **Policy enforcement**: Given an organization admin who has disabled "Bank Account" in the item type restriction policy, when a member attempts to create a new Bank Account item, then creation is blocked with an appropriate error message.
6. **Old client compatibility**: Given a vault with a Bank Account item synced, when an older client version that does not recognize the new type loads the vault, then the item is displayed as an unknown type without data corruption or sync errors.
7. **CLI CRUD**: Given a CLI user, when they run `bw create` with a Bank Account, Driver's License, or Passport item payload, then the item is created, retrievable via `bw get`, editable via `bw edit`, and deletable via `bw delete`.
8. **Vault export**: Given a user with Bank Account, Driver's License, and Passport items, when they export the vault, then all three item types appear in the export with all field values correctly represented.
9. **Autofill not triggered**: Given a Bank Account item in the vault, when the user visits a web page in the browser extension, then the new item types are not offered as autofill candidates.

### Verification Commands

```bash
# Client tests (bitwarden/clients repo)
cd apps/web && npm run test -- --testPathPattern=bank-account
cd apps/web && npm run test -- --testPathPattern=drivers-license
cd apps/web && npm run test -- --testPathPattern=passport

# Server tests (bitwarden/server repo)
dotnet test --filter "FullyQualifiedName~BankAccount"
dotnet test --filter "FullyQualifiedName~DriversLicense"
dotnet test --filter "FullyQualifiedName~Passport"

# Regression
npm run test:regression
```

---

## Security & Safety Considerations

### Data Classification
- **Vault Data**: Yes — all three item types store highly sensitive PII: bank account numbers, routing numbers, PINs, passport numbers, license numbers, and date of birth. This data must be treated with the same security posture as passwords.
- **Protected Data**: All field values are encrypted client-side using the user's vault key before being stored or transmitted. The server stores only ciphertext.
- **Data in Transit**: Standard TLS — all sync traffic uses existing secure transport. No changes required.

### Encryption & Sync
- **Encryption boundary**: Client-side only. All field values are encrypted before leaving the client. The server never sees plaintext field values for any vault item type, and these new types are no exception.
- **Key material involved**: User's master key / vault key (same as all other item types). No new key types introduced.
- **Sync impact**: New cipher types add new payload shapes to the sync response. Clients that do not recognize them must skip gracefully. No changes to sync frequency or protocol.
- **Server knowledge**: The server knows that a vault entry exists and its `CipherType` value, but cannot read any field contents.

### Security Principles

- **P01 (Zero Knowledge)**: Fully maintained. All field values encrypted client-side. Server sees only ciphertext and cipher type identifier.
- **P02 (Locked Vault Security)**: All new item fields are inaccessible when the vault is locked. Consistent with all existing item types.
- **P03 (Trust Hierarchy)**: Org-owned items in collections respect existing collection permissions. Admins can disable creation via policy. No new trust boundaries introduced.
- **P04 (Cryptographic Safety)**: No new cryptographic operations. New item types use the same AES-256 encryption as all other vault items.
- **P05 (Controlled Access)**: Item-level access is controlled by collection membership and organizational roles, consistent with existing items. Policy controls allow admins to restrict item type creation.
- **P06 (Transparency)**: No new audit log event types strictly required for MVP. Standard item create/edit/delete events should be emitted with the new cipher type identifier for admin audit log visibility.

### Threat Considerations
- **Sensitive PII concentration risk**: These item types concentrate highly sensitive identity and financial data. A client-side bug that accidentally logs or exposes field values in plaintext would be a significant trust violation. Thorough testing of hidden field behavior is critical.
- **Hidden field bypass**: Ensure that hidden fields (Account Number, PIN) cannot be extracted via DOM inspection, clipboard sniffing, or developer tools in ways that bypass the UI toggle. Consistent with how Card number masking is handled today.
- **Import/export exposure**: When users export their vault (unencrypted export), these sensitive fields will appear in plaintext. The UI must clearly warn users about this, consistent with warnings on existing export flows.
- **Formal threat modeling**: Not required for MVP given that these types follow the exact same encryption and access patterns as existing vault items. If autofill is added in a future phase, a separate threat model will be warranted.

### Data Validation
- **PIN field**: Must only accept numeric characters. Non-numeric input must be rejected client-side.
- **Date pickers**: Day/Month/Year inputs must validate for real dates (e.g., no February 30). Invalid dates must produce an error, not silent truncation.
- **All open text fields**: Subject to existing vault field length limits. No additional validation required.

### Error Handling
- If a client encounters an unknown `CipherType` value in a sync response, it must display the item as "Unknown Item Type" without crashing, corrupting data, or blocking the rest of the vault from loading.
- Validation errors (e.g., non-numeric PIN, invalid date) must surface clearly in the UI with actionable messages.
- No sensitive field values should appear in error logs.

### Resource Management
- No significant resource implications. New item types are structurally similar to Card and Identity in payload size.

### Organization & Collection Model Impact
- New item types can be owned by individuals or organizations (in collections), consistent with all existing item types.
- Collection permissions apply normally — a member only sees org-owned Bank Account items they have collection access to.
- Admin/Owner can view org-owned items per existing permissions.
- The existing item type restriction policy will be extended to include the three new types, allowing admins to disable creation org-wide.
- Provider Portal admins have the same controls as Organization admins for organizations they manage.
- No new permission types or collection-level controls are introduced.

### Enterprise Policy Controls
- The three new item types will be added to the existing item type restriction policy — no new policy type needed.
- When an admin disables a type: members cannot create new items of that type; existing items remain accessible (read/edit/delete allowed).
- Policy takes effect immediately on active sessions and at next sync for offline clients.
- No retroactive action on existing items when a policy is enabled.

### Feature Flag
- **Flag name**: `item-type-bank-account-dl-passport` (or per-type flags — TBD with engineering)
- **Rollout strategy**: Internal → Beta → GA
- **Kill switch behavior**: If disabled mid-rollout, the new item types would not appear in creation flows. Existing items already created would remain in vaults but may not be editable on clients with the flag disabled — this behavior must be explicitly designed.
- **Self-hosted flag behavior**: Feature flags for self-hosted instances follow standard self-hosted flag propagation.

---

## UI/UX Considerations

### User Interaction Flow

**Creating a Bank Account item:**
1. User opens "Create Item" flow
2. User selects "Bank Account" from item type selector
3. Form renders with all 11 fields; Account Number and PIN are shown as masked/hidden by default
4. User fills in desired fields (all optional except item name)
5. User saves; item appears in vault list with Bank Account icon

**Viewing a Bank Account item:**
1. User opens a Bank Account item
2. Account Number and PIN are masked; user sees toggle icons
3. User clicks reveal on Account Number → value shown in place
4. User clicks copy on PIN → value copied to clipboard without revealing in UI

### Discoverability & Notifications
- **Discovery**: New item types will appear in the "Create new item" type picker automatically. A release announcement via blog post and Bitwarden community forums is recommended given community-driven origin.
- **Alert Center**: Not applicable for MVP. Post-MVP consideration: surface expiration date warnings for Driver's License and Passport items in the Alert Center.
- **Notifications**: No proactive notifications required for MVP.

### Input/Output Format
- **Inputs**: All fields are optional beyond the item name. Text fields accept UTF-8. PIN accepts digits only. Date fields use structured day/month/year pickers.
- **Outputs**: Success state shows item in vault list. Error states (invalid PIN characters, invalid date) shown inline on the offending field.

### Error Messages
- PIN non-numeric input: "PIN must contain numbers only."
- Invalid date: "Please enter a valid date."
- Item type policy blocked: "Your organization does not allow creating [Bank Account / Driver's License / Passport] items."

### Accessibility
- All new fields must have proper label associations for screen readers.
- Hidden field toggle buttons must have descriptive aria-labels (e.g., "Show account number", "Hide account number").
- Date picker components must support keyboard navigation.
- Color contrast: WCAG 2.1 AA.

---

## Testing Strategy

### Unit Tests
- **CipherType model (clients)**: Serialization/deserialization roundtrip for each new type
- **Field validation**: PIN numeric-only enforcement; date picker valid/invalid date handling
- **Hidden field behavior**: Account Number and PIN hidden state, toggle, copy behavior
- **Policy enforcement**: Item type restriction policy correctly blocks creation when type is disabled

### Integration Tests
- **Sync roundtrip**: Create item on one client, verify it appears correctly on another client
- **Old client compatibility**: Simulate loading a vault with new cipher types on a client that does not recognize them; verify graceful degradation
- **Collection access**: Org-owned Bank Account item respects collection permissions

### End-to-End Tests
- **Create/view/edit/delete** for each of the three types on web vault
- **Hidden field reveal and copy** on web vault and browser extension
- **CLI CRUD** for each type
- **Policy enforcement**: Admin disables type → member cannot create → existing item still accessible

### Manual Test Scenarios
1. **Cross-client sync**: Create a Bank Account item on web, verify it appears correctly on mobile and browser extension.
   - Expected: Item visible on all clients with all fields intact.
2. **Export and re-import**: Export vault containing new item types, verify items appear in export. (Re-import not in scope for MVP but export format should be validated.)
3. **Masked field clipboard behavior**: Populate PIN field, copy without revealing — paste into a text editor and confirm the correct value was copied.
4. **Date validation**: Enter "February 30" as expiration date on Driver's License, confirm error.

### Performance Testing
- New item types add payload to vault sync. Verify sync performance is not materially degraded for vaults with large numbers of the new item types.

---

## Product Positioning

> [TBD — to be collaborated on between Product, Design, and Product Marketing]

- **Feature name**: "New Item Types" (working title); final naming TBD (e.g., "Identity Documents" as a category?).
- **User workflow impact**: Users no longer need to use Secure Notes as a workaround for storing structured financial and identity data; dedicated types provide field labels, masking, and copy affordances that make retrieval faster and more reliable.
- **Market differentiation**: Closes a gap vs. 1Password and Dashlane, which already offer richer item type libraries. Directly addresses documented community requests, reinforcing Bitwarden's responsiveness to its user base.
- **Demo update**: Yes — the standard Bitwarden product demo should be updated to showcase the new item types in the vault creation flow.

---

## Design Documentation

- **User research**: [TBD — link to research or community feedback analysis]
- **Figma / design files**: [TBD — link to Figma designs]
- **UX flows**: [TBD — link to user flow diagrams]

---

## References & Research

- [Product Initiative Confluence page](https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/2507866113/New+Item+Types+-+Bank+Account+Drivers+License+Passport)
- [Competitive analysis investigation (Don & Wes)](https://docs.google.com/spreadsheets/d/1infkIgTEiSf1Bt3-sear9-Kakz-kjKwJAPxOX1ecHCc/edit?gid=0#gid=0)
- [Bitwarden security definitions](https://contributing.bitwarden.com/architecture/security/definitions)
- [Existing CipherType definitions in bitwarden/clients — TBD link]
- [Existing item type restriction policy implementation — TBD link]

---

## Related Work

- **GitHub Issues**: [TBD]
- **Pull Requests**: [TBD]
- **Documentation**: [TBD — help center article drafts]
- **Previous Features**: Identity item type (existing), Card item type (existing)

---

## Notes

- This document was generated from the Confluence product initiative page (v11, last updated 2026-02-25 by Wes Salmon) combined with the standard Bitwarden engineering requirements template. Sections marked [TBD] require PM/Design input before the document is considered complete.
- The three item types were selected because they share a similar structural shape (named fields + notes, no complex nested data), making them efficient to deliver together.
- Post-MVP backlog candidates surfaced during this analysis: expiration date alerts in the Alert Center (for Driver's License and Passport), autofill support, and external import format compatibility.
