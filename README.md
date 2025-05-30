# Bedrock-Powered Chatbot

A CloudFormation template for deploying a serverless chatbot powered by Amazon Bedrock.

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

### Validate Template

```bash
# Make the script executable
chmod +x validate-template.sh

# Run validation
./validate-template.sh
```

### Visualize Service Interactions

```bash
# Install dependencies
npm install

# Run visualization
node visualize-services.js
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
