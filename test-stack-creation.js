const { CloudFormation } = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { loadCloudFormationYaml } = require('./cloudformation-yaml');

// Initialize CloudFormation client
const cfn = new CloudFormation({ region: 'us-east-1' });

// Read the CloudFormation template
const templatePath = path.join(__dirname, 'template.yaml');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Convert YAML to JSON for AWS SDK
const templateJSON = JSON.stringify(loadCloudFormationYaml(templateContent));

// Generate unique names for resources
const uniqueId = randomUUID().replace(/-/g, '').substring(0, 8);
const stackName = `chatbot-test-stack-${uniqueId}`;
const dynamoDBTableName = `chatbot-history-${uniqueId}`;

async function createTestStack() {
  try {
    console.log(`Creating test stack: ${stackName}`);
    
    const params = {
      StackName: stackName,
      TemplateBody: templateJSON,
      Parameters: [
        {
          ParameterKey: 'DynamoDBTableName',
          ParameterValue: dynamoDBTableName
        },
        {
          ParameterKey: 'BedrockModelId',
          ParameterValue: 'anthropic.claude-v2' // Example model ID
        }
      ],
      Capabilities: ['CAPABILITY_IAM', 'CAPABILITY_NAMED_IAM'],
      OnFailure: 'DELETE',
      TimeoutInMinutes: 30
    };

    const createResult = await cfn.createStack(params).promise();
    console.log(`Stack creation initiated: ${createResult.StackId}`);
    
    console.log('Waiting for stack creation to complete...');
    await cfn.waitFor('stackCreateComplete', { StackName: stackName }).promise();
    
    console.log('Stack created successfully!');
    
    // Get stack outputs
    const { Stacks } = await cfn.describeStacks({ StackName: stackName }).promise();
    const outputs = Stacks[0].Outputs;
    
    console.log('Stack outputs:');
    outputs.forEach(output => {
      console.log(`- ${output.OutputKey}: ${output.OutputValue}`);
    });
    
    return true;
  } catch (error) {
    console.error('Stack creation failed:');
    console.error(error.message);
    return false;
  }
}

// Execute stack creation test
createTestStack();
