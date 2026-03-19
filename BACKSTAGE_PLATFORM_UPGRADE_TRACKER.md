# Backstage Platform Upgrade Tracker

This document is the working implementation tracker for upgrading this repository into a platform product backed by Backstage.

## Objective

Transform the repository from a standalone AWS CloudFormation chatbot template into a reusable internal developer platform product with:

- Backstage catalog registration
- TechDocs documentation
- Backstage Scaffolder self-service
- Validation and CI guardrails
- Safer AWS runtime defaults
- A clear delivery backlog and progress tracker

## Current Progress Snapshot

Overall status: In progress

Completed:

- CloudFormation template exists in `template.yaml`
- Backstage component and API metadata exist in `catalog-info.yaml`
- TechDocs structure exists in `mkdocs.yml` and `docs/`
- Scaffolder template exists in `templates/create-bedrock-chatbot/template.yaml`
- A local Backstage app has been scaffolded in `backstage/`
- Backstage app config has been wired to the root catalog and scaffolder template
- Platform planning docs exist in `PLATFORM_AS_PRODUCT.md`, `IMPLEMENTATION_PLAN.md`, and `BACKSTAGE_INSTALLATION.md`
- AWS CloudFormation validation has been run successfully against `template.yaml`
- Backstage config validation has been run successfully with `backstage-cli config:check`

Missing or incomplete:

- Backstage instance is not yet installed in this repo or connected to this repo
- Component is not yet confirmed in a running Backstage UI session
- TechDocs publishing is not yet confirmed end to end in the running app
- Scaffolder template is not yet confirmed in the running Backstage UI
- CI workflows are not yet present
- CloudFormation hardening tasks are not yet implemented
- Observability and governance integrations are not yet implemented

## Status Legend

- `[x]` Done
- `[ ]` Not started
- `[-]` In progress
- `[!]` Blocked or external dependency

## Workstreams and Tasks

## 1. Platform Definition

Purpose: define the product boundary, owner, and intended usage.

- [x] Create a platform-as-product guide
- [x] Create an implementation plan
- [x] Create a Backstage installation guide
- [ ] Confirm final owner entity for Backstage
- [ ] Confirm supported AWS regions
- [ ] Confirm approved Bedrock models
- [ ] Confirm environments supported by the starter
- [ ] Confirm security and compliance expectations

Missing details to add:

- Real Backstage owner group name
- Real GitHub org/repo publishing target
- Support model and escalation path

## 2. Backstage Catalog

Purpose: make the service discoverable in the internal developer portal.

- [x] Add `catalog-info.yaml`
- [x] Define a `Component` entity
- [x] Define an `API` entity
- [x] Add TechDocs annotation
- [-] Register the repo in the local Backstage app config
- [ ] Verify owner resolution in the running Backstage UI
- [ ] Verify component-to-API linkage in the running Backstage UI
- [ ] Add final source control annotations for the real org/repo

Current repo assets:

- `catalog-info.yaml`

Missing implementation:

- Runtime verification in the live portal UI
- Final GitHub slug and any org-specific annotations

## 3. TechDocs

Purpose: publish docs as part of the platform product.

- [x] Add `mkdocs.yml`
- [x] Add foundational docs in `docs/`
- [x] Add backlog doc
- [x] Add Backstage adoption doc
- [x] Enable TechDocs in the local Backstage app config
- [ ] Verify docs render from the component page
- [ ] Add runbook content
- [ ] Add troubleshooting content
- [ ] Add support/contact information

Current repo assets:

- `mkdocs.yml`
- `docs/index.md`
- `docs/architecture.md`
- `docs/backlog.md`
- `docs/backstage.md`

Missing implementation:

- Live TechDocs build and publish
- Operational docs for consumers

## 4. Scaffolder Self-Service

Purpose: let teams create chatbot services through a golden path.

- [x] Add Backstage Scaffolder template
- [x] Add skeleton catalog file
- [x] Add skeleton README
- [-] Register the template in the local Backstage app config
- [ ] Test a scaffolder run end to end
- [ ] Replace placeholder GitHub publishing owner `tukue`
- [ ] Add environment-specific deployment files to the skeleton
- [ ] Add CI files to the skeleton
- [ ] Add richer generated docs to the skeleton

Current repo assets:

- `templates/create-bedrock-chatbot/template.yaml`
- `templates/create-bedrock-chatbot/skeleton/catalog-info.yaml`
- `templates/create-bedrock-chatbot/skeleton/README.md`

Missing implementation:

- Live registration in Scaffolder
- Real publish target
- More complete starter skeleton

## 5. Validation and CI

Purpose: ensure the platform product stays healthy as it evolves.

- [x] Add local validation script
- [x] Add AWS-backed validation script
- [x] Add shell validation script
- [x] Confirm CloudFormation validates with AWS
- [ ] Add GitHub Actions or other CI workflow
- [ ] Run `cfn-lint` in CI
- [ ] Validate Backstage YAML in CI
- [ ] Build TechDocs in CI
- [ ] Add pull request checks

Current repo assets:

- `validate-template-local.js`
- `validate-template.js`
- `test-template.sh`
- `.cfnlintrc`

Missing implementation:

- CI workflow files
- Automated checks in pull requests

## 6. CloudFormation Hardening

Purpose: make the AWS starter safer and more production-ready.

- [ ] Add parameter constraints
- [ ] Add resource tags
- [ ] Add CloudWatch log retention
- [ ] Add Lambda error alarms
- [ ] Add API Gateway error alarms
- [ ] Narrow IAM permissions where possible
- [ ] Add more operator-friendly outputs
- [ ] Consider moving inline Lambda code into packaged source

Current status:

- Template is valid
- Runtime hardening has not yet been implemented

Primary missing items:

- Operational safety controls
- Better observability defaults
- Better maintainability for Lambda source

## 7. Backstage Installation

Purpose: get a real Backstage environment running so the repo assets can be used.

- [x] Create Backstage installation guide
- [x] Create a Backstage app in `backstage/`
- [ ] Configure GitHub integration
- [x] Configure catalog import locations
- [x] Configure TechDocs for local mode
- [ ] Configure authentication/sign-in
- [ ] Configure production database if needed
- [ ] Start the portal and verify entity/template visibility

Current repo asset:

- `BACKSTAGE_INSTALLATION.md`

Missing implementation:

- Integration configuration
- Running portal verification

## 8. Observability and Governance

Purpose: expose health, ownership, and maturity signals through the platform.

- [ ] Add AWS dashboard or plugin annotations
- [ ] Add scorecards or quality checks
- [ ] Add runbooks linked from docs
- [ ] Add dependency/service metadata where useful
- [ ] Add cost or operational metadata if supported

Current status:

- Planned only

## Priority Order

Recommended next execution order:

1. Install or connect Backstage
2. Register `catalog-info.yaml`
3. Register `templates/create-bedrock-chatbot/template.yaml`
4. Add CI workflows
5. Harden `template.yaml`
6. Add observability and governance

## Immediate Next Tasks

These are the most valuable next actions from the current repo state:

- [ ] Start the local Backstage app and verify the catalog UI
- [ ] Confirm this repo’s `catalog-info.yaml` appears correctly in the catalog
- [ ] Confirm the scaffolder template appears and runs
- [ ] Update the scaffolder publish step for the real GitHub org
- [ ] Add CI workflow files for template and metadata validation
- [ ] Add CloudFormation hardening to `template.yaml`

## Progress Table

| Area | Status | Notes |
| --- | --- | --- |
| Platform docs | Done | Core docs and plans exist |
| Catalog metadata | In progress | Wired into local Backstage config, UI still needs verification |
| TechDocs source | In progress | Wired into local Backstage config, UI still needs verification |
| Scaffolder template | In progress | Wired into local Backstage config, UI still needs verification |
| AWS template validation | Done | CloudFormation validation succeeded |
| CI automation | Not started | No workflow files yet |
| Template hardening | Not started | Valid template, but basic baseline only |
| Backstage installation | In progress | App scaffolded and config checked, full startup still pending |
| Observability/governance | Not started | Planning only |

## Definition of Done

This upgrade can be considered complete when:

1. A Backstage instance is running and connected.
2. The component is visible in the Backstage catalog.
3. TechDocs render from this repo.
4. The scaffolder template is visible and usable.
5. CI validates CloudFormation and Backstage metadata.
6. The AWS template includes baseline operational hardening.

## Related Files

- `catalog-info.yaml`
- `mkdocs.yml`
- `template.yaml`
- `templates/create-bedrock-chatbot/template.yaml`
- `PLATFORM_AS_PRODUCT.md`
- `IMPLEMENTATION_PLAN.md`
- `BACKSTAGE_INSTALLATION.md`
