# Implementation Plan

This document turns the platform-as-product direction into an executable implementation plan for this repository.

## Objective

Evolve this repository from a standalone AWS CloudFormation chatbot template into a Backstage-enabled internal developer platform product.

## Scope

In scope:

- Backstage catalog registration
- TechDocs documentation
- Scaffolder template publication
- Validation and CI guardrails
- CloudFormation hardening
- Platform ownership and lifecycle

Out of scope for the first release:

- Building a custom Backstage plugin
- Multi-cloud support
- Full production observability stack
- Enterprise policy automation beyond baseline checks

## Phase 1: Foundation

Goal: make the repo understandable and publishable as a product.

Tasks:

1. Add and maintain Backstage catalog metadata.
2. Add TechDocs-ready documentation.
3. Define ownership, lifecycle, and supported usage.
4. Create a platform implementation guide.

Done in repo:

- `catalog-info.yaml`
- `mkdocs.yml`
- `docs/`
- `PLATFORM_AS_PRODUCT.md`

## Phase 2: Self-Service Enablement

Goal: make chatbot provisioning a repeatable golden path.

Tasks:

1. Register the scaffolder template in Backstage.
2. Validate all template inputs and defaults.
3. Extend the template skeleton with deployment and repo standards.
4. Test repository creation and catalog registration.

Repo assets:

- `templates/create-bedrock-chatbot/template.yaml`
- `templates/create-bedrock-chatbot/skeleton/catalog-info.yaml`
- `templates/create-bedrock-chatbot/skeleton/README.md`

## Phase 3: Validation and Delivery

Goal: ensure changes are safe before broad adoption.

Tasks:

1. Run local template structure validation.
2. Run AWS-backed CloudFormation validation in CI.
3. Add `cfn-lint` in CI.
4. Add YAML validation for Backstage metadata.
5. Add TechDocs build verification.

Repo assets:

- `validate-template-local.js`
- `validate-template.js`
- `test-template.sh`
- `.cfnlintrc`

## Phase 4: Infrastructure Hardening

Goal: improve runtime safety and operational quality.

Tasks:

1. Add CloudWatch log retention.
2. Add alarms for Lambda errors and API Gateway failures.
3. Add resource tags for owner, environment, and cost center.
4. Add parameter constraints and safer defaults.
5. Reduce IAM permissions where possible.
6. Consider moving inline Lambda code into packaged source.

## Phase 5: Platform Operations

Goal: manage this as a real product over time.

Tasks:

1. Define release/versioning for the starter.
2. Add adoption metrics and usage review.
3. Define deprecation policy for models and regions.
4. Keep ownership and documentation current.
5. Review backlog monthly.

## Work Breakdown

### Workstream A: Backstage integration

- Register component
- Register API
- Publish TechDocs
- Register scaffolder template

### Workstream B: Repository quality

- Add CI workflows
- Add linting
- Add validation checks
- Keep docs in sync

### Workstream C: AWS platform maturity

- Harden template
- Improve monitoring
- Improve IAM boundaries
- Add operational outputs

## Suggested delivery order

1. Backstage registration
2. TechDocs publication
3. Scaffolder publication
4. CI and validation
5. Template hardening
6. Observability and governance

## Exit criteria for first usable release

The first platform release is ready when:

1. The component is visible in Backstage.
2. Docs render through TechDocs.
3. The scaffolder template is usable.
4. CI validates template and metadata.
5. The CloudFormation template deploys successfully in a target AWS account.

## Immediate next steps

1. Install or connect an existing Backstage instance.
2. Register this repo’s `catalog-info.yaml`.
3. Register the scaffolder template.
4. Add CI workflows for validation.

