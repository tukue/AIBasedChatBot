# Bedrock Chatbot Platform Starter

A CloudFormation-based AWS Bedrock chatbot starter that is now structured to be consumed as a Backstage platform product.

## Architecture

```
                                  ┌─────────────┐
                                  │             │
                                  │  API Gateway│
                                  │             │
                                  └──────┬──────┘
                                         │
                                         │ Invokes
                                         ▼
┌─────────────┐                  ┌─────────────┐                  ┌─────────────┐
│             │                  │             │                  │             │
│  DynamoDB   │◄─────Writes──────┤   Lambda    ├─────Calls───────►│   Bedrock   │
│             │                  │             │                  │             │
└─────────────┘                  └─────────────┘                  └─────────────┘
```

## Platform product additions

This repository now includes:

- `catalog-info.yaml` for Backstage catalog registration
- `mkdocs.yml` and `docs/` for TechDocs-ready documentation
- `templates/create-bedrock-chatbot/template.yaml` as a Backstage Scaffolder template
- `docs/backlog.md` as the implementation backlog for the IDP transition

## Resources

This template creates the following AWS resources:

- **DynamoDB Table**: Stores conversation history
- **Lambda Function**: Processes requests and calls Bedrock
- **API Gateway**: Provides HTTP endpoint for the chatbot
- **IAM Roles**: Necessary permissions for Lambda

## Deployment

### Prerequisites

- AWS CLI installed and configured
- AWS account with access to Bedrock, Lambda, API Gateway, and DynamoDB

### Deploy the Stack

```bash
aws cloudformation create-stack \
  --stack-name bedrock-chatbot \
  --template-body file://template.yaml \
  --parameters \
    ParameterKey=DynamoDBTableName,ParameterValue=chatbot-history \
    ParameterKey=BedrockModelId,ParameterValue=anthropic.claude-v2 \
  --capabilities CAPABILITY_IAM
```

### Monitor Deployment

```bash
aws cloudformation describe-stacks --stack-name bedrock-chatbot
```

## Testing

### Validate Template Locally

```bash
npm test
```

### Validate Template Against AWS

```bash
node validate-template.js
```

### Visualize Service Interactions

```bash
npm install
node visualize-services.js template.yaml
```

## Usage

Once deployed, you can interact with the chatbot by sending POST requests to the API Gateway endpoint:

```bash
curl -X POST \
  https://{api-id}.execute-api.{region}.amazonaws.com/prod/chat \
  -H 'Content-Type: application/json' \
  -d '{"input": "Hello, how to test cloudformation template?"}'
```

## Cleanup

To delete all resources:

```bash
aws cloudformation delete-stack --stack-name bedrock-chatbot
```
