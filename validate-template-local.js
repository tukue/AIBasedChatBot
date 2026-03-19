const fs = require('fs');
const path = require('path');
const { loadCloudFormationYaml } = require('./cloudformation-yaml');

const templatePath = path.join(__dirname, 'template.yaml');
const templateContent = fs.readFileSync(templatePath, 'utf8');
const template = loadCloudFormationYaml(templateContent);

const requiredParameters = ['DynamoDBTableName', 'BedrockModelId'];
const requiredResources = [
  'DynamoDBTable',
  'ChatbotLambda',
  'ChatbotLambdaRole',
  'ApiGateway',
  'ApiGatewayMethod',
  'ApiGatewayDeployment',
  'LambdaApiGatewayPermission'
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateTemplateStructure() {
  assert(template && typeof template === 'object', 'Template did not parse into an object');
  assert(template.Parameters, 'Template is missing Parameters');
  assert(template.Resources, 'Template is missing Resources');

  for (const parameter of requiredParameters) {
    assert(template.Parameters[parameter], `Missing required parameter: ${parameter}`);
  }

  for (const resource of requiredResources) {
    assert(template.Resources[resource], `Missing required resource: ${resource}`);
  }

  const lambda = template.Resources.ChatbotLambda;
  assert(lambda.Properties.Runtime === 'python3.8', 'Unexpected Lambda runtime');
  assert(
    lambda.Properties.Environment.Variables.DYNAMODB_TABLE_NAME,
    'Lambda environment is missing DYNAMODB_TABLE_NAME'
  );
  assert(
    lambda.Properties.Environment.Variables.BEDROCK_MODEL_ID,
    'Lambda environment is missing BEDROCK_MODEL_ID'
  );

  const outputs = template.Outputs || {};
  assert(outputs.ChatbotApiUrl, 'Template is missing ChatbotApiUrl output');

  console.log('Local template structure validation passed.');
}

try {
  validateTemplateStructure();
} catch (error) {
  console.error(`Local template structure validation failed: ${error.message}`);
  process.exitCode = 1;
}
