# Architecture

## Runtime architecture

The current deployment model is a lightweight AWS serverless stack:

- API Gateway exposes a `POST /chat` endpoint
- Lambda receives requests, calls Amazon Bedrock, and stores the interaction
- DynamoDB stores conversation history
- IAM grants Lambda basic execution, Bedrock invocation, and DynamoDB write access

## Platform-as-product target state

The desired IDP experience is broader than the runtime stack. In platform terms, this product should provide:

- A catalog entry in Backstage so teams can discover the capability
- A scaffolder template so teams can self-service a new chatbot baseline
- TechDocs so ownership, usage, and operational guidance stay close to the code
- Delivery guardrails so deployments, permissions, and naming conventions are standardized
- Observability integrations so service health and cloud resources are visible in the portal

## Gaps between current and target state

Today the repo contains deployable infrastructure, but lacks most productization layers:

- No software catalog metadata existed
- No TechDocs structure existed
- No reusable Backstage scaffolder definition existed
- Existing validation scripts drifted from the actual CloudFormation parameters
- Ownership and roadmap were documented only loosely
