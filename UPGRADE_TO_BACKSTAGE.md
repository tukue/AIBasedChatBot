# Upgrading to Platform as Product with Backstage

This guide outlines the strategy for evolving the Bedrock-Powered Chatbot repository into a "Platform as Product" model using [Backstage](https://backstage.io) as the Internal Developer Portal (IDP).

## Objectives

1.  **Service Catalog**: Register the Bedrock Chatbot as a discoverable component.
2.  **Self-Service Templates**: Allow developers to spin up new chatbot instances using the existing CloudFormation template.
3.  **Docs-as-Code**: Leverage TechDocs for centralized documentation.
4.  **AWS Integration**: Visualize CloudFormation status and Lambda metrics within the portal.
5.  **Observability**: Integrate Prometheus and Grafana for advanced monitoring and alerting.

---

## Step 1: Create the Component Catalog

To register this repository in Backstage, we must add a `catalog-info.yaml` file to the root directory. This metadata file links the code to the portal.

**Proposed `catalog-info.yaml`:**

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: bedrock-chatbot
  description: AI Chatbot powered by AWS Bedrock, Lex, and Lambda.
  tags:
    - aws
    - ai
    - chatbot
    - bedrock
  annotations:
    # Links to the AWS resources created by template.yaml
    aws.amazon.com/cloudformation/stack-name: bedrock-chatbot
    github.com/project-slug: your-org/bedrock-powered-chatbot
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
  owner: team-ai
  providesApis:
    - chatbot-api
```

## Step 2: Create a Software Template (Scaffolder)

To treat this platform as a product, we enable other teams to self-serve new chatbots. We will create a Backstage Template that wraps the existing `template.yaml`.

**Action Items:**
1. Create a `scaffolder-template.yaml` in a `templates/` directory.
2. Define parameters matching the CloudFormation inputs (`BedrockModelId`, `BotName`).

**Snippet for `scaffolder-template.yaml`:**

```yaml
apiVersion: backstage.io/v1beta3
kind: Template
metadata:
  name: create-bedrock-chatbot
  title: Create Bedrock Chatbot
  description: Scaffolds a new AWS Bedrock and Lex chatbot using CloudFormation.
spec:
  owner: team-ai
  type: service
  parameters:
    - title: Chatbot Configuration
      required:
        - name
        - modelId
      properties:
        name:
          title: Name
          type: string
          description: Unique name for the component
        modelId:
          title: Bedrock Model ID
          type: string
          default: anthropic.claude-v2
          description: The AWS Bedrock model version/ID to use.
        region:
          title: AWS Region
          type: string
          default: us-east-1
          description: The AWS region to deploy to.
  steps:
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: ./content
        values:
          name: ${{ parameters.name }}

    - id: publish
      name: Publish to Version Control
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: This is ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}

    - id: deploy-cfn
      name: Deploy CloudFormation
      action: aws:cloudformation:create
      input:
        stackName: ${{ parameters.name }}
        templatePath: template.yaml
        region: ${{ parameters.region }}
        templateParameters:
          BedrockModelId: ${{ parameters.modelId }}
          BotName: ${{ parameters.name }}
```

## Step 3: Implement TechDocs

The current `readme.txt` should be converted to Markdown (`README.md`) to support TechDocs.

1.  Rename `readme.txt` to `README.md`.
2.  Add a `mkdocs.yaml` file to the root:

```yaml
site_name: Bedrock Chatbot Docs
nav:
  - Home: README.md
plugins:
  - techdocs-core
```

## Step 4: AWS Plugin Integration

To provide operational visibility ("Single Pane of Glass"), configure the following Backstage plugins:

1.  **AWS CloudFormation Plugin**: Uses the `aws.amazon.com/cloudformation/stack-name` annotation to show the deployment status of the stack defined in `template.yaml`.
2.  **AWS Lambda Plugin**: To view logs and metrics for `ChatbotLambda`.

## Step 5: Observability as a Service (Prometheus & Grafana)

To provide deep insights and unify monitoring across services, we will integrate with Prometheus and Grafana.

1.  **Metrics Collection**: Utilize the platform's Prometheus instance (or Amazon Managed Service for Prometheus) to ingest metrics from AWS CloudWatch via an exporter.
2.  **Grafana Dashboards**: Create visualizations for Bedrock model latency, Lambda duration, and error rates.
3.  **Backstage Integration**: Enable the Grafana plugin to display alerts and dashboards in the service catalog.
4.  **Metadata Update**: Add the Grafana selector to `catalog-info.yaml`.

    ```yaml
    annotations:
      grafana/dashboard-selector: 'service=bedrock-chatbot'
    ```

---

## Next Steps

1.  Initialize the git repository if not done.
2.  Commit the `catalog-info.yaml` based on Step 1.
3.  Register the component in your Backstage instance via the "Create" or "Register Existing Component" page.