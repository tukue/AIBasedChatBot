# Platform Backlog

This backlog is organized so we can evolve the repository from a standalone template into a usable Backstage-backed platform product.

## Epic 1: Productize the asset for Backstage

Goal: make the chatbot starter discoverable and understandable in an IDP.

Tasks:

- Add `catalog-info.yaml` with component and API definitions
- Add TechDocs configuration and foundational docs
- Define ownership, lifecycle, and supported use cases
- Document onboarding steps for importing the component and template into Backstage

## Epic 2: Create a self-service golden path

Goal: let teams provision a new chatbot safely through Backstage Scaffolder.

Tasks:

- Create a Backstage software template for chatbot provisioning
- Add template inputs for service name, owner, AWS region, model id, and DynamoDB table name
- Add repository bootstrap files in a scaffolder skeleton
- Add placeholders for CI/CD and environment-specific deployment wiring
- Document how the template should be published into an existing Backstage instance

## Epic 3: Harden the infrastructure baseline

Goal: make the AWS template safer and easier to operate at scale.

Tasks:

- Add CloudWatch logs retention, alarms, and basic operational outputs
- Narrow IAM permissions where possible
- Add input validation and parameter constraints
- Consider moving inline Lambda code into a packaged function for maintainability
- Add tags to resources for cost allocation and ownership

## Epic 4: Improve delivery confidence

Goal: ensure changes to the platform product are validated before adoption broadens.

Tasks:

- Replace drifted validation checks with repo-accurate tests
- Add an offline template structure validation path for local development
- Add CI workflow for linting and CloudFormation validation
- Add smoke tests for catalog and scaffolder YAML validity

## Epic 5: Add platform integrations

Goal: expose operational context through the IDP.

Tasks:

- Add Backstage annotations for AWS, TechDocs, and source control integrations
- Add monitoring links or plugins for CloudWatch dashboards and alarms
- Define scorecard checks such as docs, ownership, runbooks, and alarm coverage
- Add service dependency views and cost visibility where available

## Recommended implementation order

1. Product metadata and docs
2. Scaffolder template and skeleton
3. Validation and CI
4. Runtime hardening
5. Observability and governance extensions
