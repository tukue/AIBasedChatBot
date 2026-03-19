# Platform as Product Implementation Guide

This document explains how to evolve this repository from a standalone AWS CloudFormation template into a platform product that can be published and operated through Backstage as an internal developer portal capability.

## Goal

Turn the Bedrock chatbot starter into a reusable product with:

- Clear ownership
- Service catalog registration
- Self-service provisioning
- Docs-as-code
- Validation and delivery guardrails
- A path to observability and governance

## Current baseline

Today this repository already contains:

- `template.yaml` with the AWS infrastructure for the chatbot
- `catalog-info.yaml` for Backstage catalog registration
- `mkdocs.yml` and `docs/` for TechDocs-ready documentation
- `templates/create-bedrock-chatbot/template.yaml` for Backstage Scaffolder
- `docs/backlog.md` for the implementation backlog

## Step 1: Define the platform product

Agree on the product shape before adding more automation.

Actions:

1. Confirm the product name: Bedrock Chatbot Platform Starter.
2. Confirm the owning team, for example `team-platform`.
3. Define who the internal users are.
4. Define what is self-service and what still requires review.
5. Define the initial support boundary:
   - Supported AWS regions
   - Supported Bedrock models
   - Deployment environments
   - Security and compliance expectations

Deliverables:

- `catalog-info.yaml`
- `docs/index.md`
- `docs/architecture.md`

## Step 2: Register the component in Backstage

Make the repository discoverable in the software catalog.

Actions:

1. Import the root `catalog-info.yaml` into your Backstage catalog.
2. Verify the component appears with the correct owner, lifecycle, and tags.
3. Verify the API definition is attached to the component.
4. Confirm the TechDocs annotation points to this repository root.

Validation:

- Component is visible in Backstage catalog
- Owner is resolved correctly
- API entity is linked correctly

Deliverables:

- `catalog-info.yaml`

## Step 3: Publish the documentation through TechDocs

Treat documentation as part of the product, not as an afterthought.

Actions:

1. Ensure your Backstage instance supports TechDocs.
2. Publish docs from this repo using `mkdocs.yml`.
3. Verify the following pages render:
   - Overview
   - Architecture
   - Backlog
   - Backstage Adoption
4. Add runbooks and support expectations as adoption grows.

Validation:

- Docs build successfully
- Docs are visible from the Backstage component page

Deliverables:

- `mkdocs.yml`
- `docs/index.md`
- `docs/architecture.md`
- `docs/backlog.md`
- `docs/backstage.md`

## Step 4: Publish the self-service template

This is the core “platform as product” move: teams should be able to request a new chatbot service through Backstage instead of manually copying infrastructure.

Actions:

1. Register `templates/create-bedrock-chatbot/template.yaml` in the Backstage Scaffolder.
2. Review the input form:
   - Service name
   - Owner
   - Description
   - AWS region
   - Bedrock model ID
   - DynamoDB table name
3. Adjust the publish step for your GitHub organization and repository conventions.
4. Extend the template skeleton with:
   - Deployment workflow files
   - Environment configuration
   - Additional docs
   - Security defaults

Validation:

- Template appears in Backstage Scaffolder
- A test run creates a repository successfully
- The generated repo registers back into the catalog

Deliverables:

- `templates/create-bedrock-chatbot/template.yaml`
- `templates/create-bedrock-chatbot/skeleton/catalog-info.yaml`
- `templates/create-bedrock-chatbot/skeleton/README.md`

## Step 5: Add validation and delivery guardrails

A platform product needs repeatability and confidence.

Actions:

1. Keep local validation available for contributors.
2. Use AWS-backed validation in CI where credentials are available.
3. Add linting for CloudFormation templates.
4. Add YAML validation for Backstage catalog and scaffolder files.
5. Add pull request checks for:
   - CloudFormation validation
   - Catalog file validity
   - Scaffolder template validity
   - Docs build

Validation:

- Local checks pass
- CI blocks broken templates and invalid metadata

Deliverables:

- `validate-template.js`
- `validate-template-local.js`
- `test-template.sh`
- `.cfnlintrc`

## Step 6: Harden the AWS runtime baseline

Before broad adoption, improve the infrastructure so the product is safer and easier to operate.

Actions:

1. Add parameter constraints for safer input handling.
2. Add resource tags for ownership and cost visibility.
3. Add CloudWatch log retention.
4. Add alarms for Lambda failures and API errors.
5. Narrow IAM permissions where possible.
6. Consider moving inline Lambda code into packaged source files.
7. Add outputs that are useful for operators and portal links.

Validation:

- Stack deploys cleanly in target regions
- Logs and alarms exist after deployment
- Permissions are minimal but sufficient

## Step 7: Add observability and governance integrations

After the core self-service flow works, expose more operational context in the portal.

Actions:

1. Add links or annotations for AWS dashboards.
2. Add scorecards or checks for:
   - Ownership
   - Documentation
   - Alarm coverage
   - Deployment automation
3. Add dependency visibility if your Backstage setup supports it.
4. Add cost and operational metadata where available.

Validation:

- Teams can discover not only the service, but also its health and support posture

## Step 8: Operationalize the product lifecycle

A platform product needs a managed lifecycle, not just a template.

Actions:

1. Define how versions of the starter are released.
2. Define how changes are announced to internal users.
3. Define deprecation policy for models, regions, or templates.
4. Track feature requests and adoption metrics.
5. Review the backlog regularly and ship in small increments.

Validation:

- Consumers know which version to use
- Breaking changes are controlled
- Ownership stays current

## Suggested implementation order

1. Register the component in Backstage.
2. Publish TechDocs.
3. Publish the Scaffolder template.
4. Add CI validation.
5. Harden the CloudFormation template.
6. Add observability and governance integrations.

## Recommended next actions for this repo

1. Import `catalog-info.yaml` into your Backstage instance.
2. Import `templates/create-bedrock-chatbot/template.yaml` into Scaffolder.
3. Add CI to run CloudFormation and metadata validation.
4. Harden `template.yaml` with alarms, tags, and parameter constraints.

## Repo references

- `catalog-info.yaml`
- `mkdocs.yml`
- `docs/backlog.md`
- `docs/backstage.md`
- `templates/create-bedrock-chatbot/template.yaml`
- `template.yaml`
