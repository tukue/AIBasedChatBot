# Backstage Installation Guide

This guide explains how to install Backstage and connect this repository to it as a platform product.

## Goal

Stand up a Backstage instance, then register this repository as:

- A catalog component
- A TechDocs source
- A Scaffolder template

## Prerequisites

You should have:

- Node.js 20 or later
- Yarn or npm
- Git
- Access to a GitHub organization or repository host
- A place to run Backstage, local or hosted

Optional but recommended:

- PostgreSQL for production Backstage deployments
- GitHub App or token for catalog/scaffolder integrations
- Cloud storage for TechDocs publishing in production

## Current repo status

This repository now already includes a scaffolded Backstage app in:

`backstage/`

It has been configured to load:

- `../catalog-info.yaml`
- `../templates/create-bedrock-chatbot/template.yaml`
- local org and system entities from `backstage/examples/`

## Step 1: Create a Backstage app

Use the official Backstage app creator if you want to reproduce the install from scratch.

```bash
npx @backstage/create-app@latest
```

In this repository, that step has already been completed and the app lives under `backstage/`.

## Step 2: Start Backstage locally

Move into the new app and install dependencies if needed.

```bash
cd backstage
yarn install
yarn dev
```

Backstage typically starts at:

```text
http://localhost:3000
```

## Step 3: Configure integrations

Update `backstage/app-config.yaml` in the Backstage app.

You will usually need:

- GitHub integration
- Catalog locations
- TechDocs configuration

Example areas to configure:

1. `integrations.github`
2. `catalog.locations`
3. `techdocs`

This repo already includes local file-based catalog locations for the component and scaffolder template.

## Step 4: Register this repository in the catalog

Once Backstage is running:

1. Open the catalog import page.
2. Choose repository URL import.
3. If needed, point Backstage to this repo’s `catalog-info.yaml`.

Expected result:

- The `bedrock-chatbot` component appears in the catalog.
- The `bedrock-chatbot-api` API appears and links to the component.

## Step 5: Enable TechDocs

This repository already includes:

- `mkdocs.yml`
- `docs/`

To use TechDocs:

1. Make sure TechDocs is enabled in your Backstage app.
2. Choose one of these modes:
   - Local build
   - CI build and publish
3. Rebuild docs and verify they show on the component page.

For local-first setups, you can begin with TechDocs in local mode and move to a publisher later.

## Step 6: Register the Scaffolder template

This repo already includes a template at:

`templates/create-bedrock-chatbot/template.yaml`

To register it:

1. Open the Backstage create/import template flow.
2. Register the template file from this repository.
3. Confirm it appears as `Create Bedrock Chatbot`.

Expected result:

- Developers can launch the scaffolder form
- The form asks for service metadata and AWS configuration
- A repository can be created from the template

## Step 7: Adapt publishing settings

The included scaffolder template currently assumes GitHub publishing and uses `tukue` as the owner in the publish step.

Before production use, update:

- GitHub owner/org
- Repository naming convention
- Default branch
- Authentication/integration settings

File to edit:

- `templates/create-bedrock-chatbot/template.yaml`

## Step 8: Add production-ready Backstage settings

For production use, you should also configure:

1. PostgreSQL instead of SQLite
2. Secure secrets management
3. TechDocs publisher storage
4. GitHub App or enterprise SCM integration
5. Sign-in/auth provider
6. Monitoring and logging for Backstage itself

## Step 9: Validate the end-to-end setup

Use this checklist:

1. Backstage starts locally or in your target environment.
2. This repo imports successfully into the catalog.
3. TechDocs render from this repo.
4. The `Create Bedrock Chatbot` template appears in Scaffolder.
5. A scaffolder run can create a test repository.

## Step 10: Connect platform operations

Once installation works:

1. Add CI for docs and template validation.
2. Add ownership and support metadata.
3. Add cloud links, dashboards, and scorecards.
4. Treat this starter as a versioned platform product.

## Files in this repo that Backstage will use

- `catalog-info.yaml`
- `mkdocs.yml`
- `docs/index.md`
- `docs/backstage.md`
- `templates/create-bedrock-chatbot/template.yaml`

## Recommended next step

After installing Backstage, the first repo-specific action should be registering `catalog-info.yaml`, then registering the scaffolder template.
