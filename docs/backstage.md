# Backstage Adoption

## What is included here

This repository now includes the minimum artifacts required to treat the chatbot starter as a product inside an existing Backstage deployment:

- `catalog-info.yaml` for catalog registration
- `mkdocs.yml` and `docs/` for TechDocs
- `templates/create-bedrock-chatbot/template.yaml` for the Scaffolder

## How to use it

1. Register the root `catalog-info.yaml` in your Backstage catalog.
2. Register the scaffolder template from `templates/create-bedrock-chatbot/template.yaml`.
3. Publish TechDocs if your Backstage instance is configured to build docs from source.

## What is intentionally not in this repo yet

- A full Backstage application
- Backstage plugin code
- Production CI/CD for publishing templates or docs
- Cloud-specific portal plugins wired to your organization

Those pieces depend on the Backstage installation model used by your organization, so this repository focuses on platform-product assets that are portable across Backstage environments.
