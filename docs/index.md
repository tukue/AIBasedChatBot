# Bedrock Chatbot Platform Starter

This repository started as a single AWS CloudFormation template for a Bedrock-powered chatbot. It is now being shaped into a platform product that can be published through Backstage as a reusable internal developer platform capability.

## What this repo contains

- An AWS CloudFormation template that deploys a serverless chatbot backed by API Gateway, Lambda, DynamoDB, and Amazon Bedrock
- Backstage catalog metadata so the service can be registered in a software catalog
- TechDocs-ready documentation for product, architecture, and roadmap visibility
- A starter Backstage software template that can be imported into an existing Backstage portal

## Product intent

The platform product goal is to make "create a Bedrock chatbot" a safe, repeatable, self-service workflow rather than a one-off infrastructure exercise.

## Current status

The repository is Backstage-ready, but it does not yet include a full Backstage application. The expected operating model is:

1. Import this component into an existing Backstage instance.
2. Import the included software template into the Backstage Scaffolder.
3. Incrementally add CI/CD, observability, scorecards, and golden-path automation.
