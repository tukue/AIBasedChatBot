const { CloudFormation } = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Get region from command line or environment variable or use default
const region = process.env.AWS_REGION || process.argv[2] || 'us-east-1';
console.log(`Using AWS region: ${region}`);

// Initialize CloudFormation client
const cfn = new CloudFormation({ region });

// Read the CloudFormation template
const templatePath = path.join(__dirname, 'template.yaml');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Convert YAML to JSON for validation
const templateJSON = JSON.stringify(yaml.load(templateContent));

async function validateTemplate() {
  try {
    console.log('Validating CloudFormation template...');
    const validationResult = await cfn.validateTemplate({ TemplateBody: templateJSON }).promise();
    console.log('Template is valid!');
    console.log('Template capabilities:', validationResult.Capabilities || 'None required');
    console.log('Template parameters:');
    if (validationResult.Parameters && validationResult.Parameters.length > 0) {
      validationResult.Parameters.forEach(param => {
        console.log(`- ${param.ParameterKey}: ${param.Description || 'No description'}`);
      });
    } else {
      console.log('No parameters defined in template');
    }
    return true;
  } catch (error) {
    console.error('Template validation failed:');
    console.error(error.message);
    return false;
  }
}

// Execute validation
validateTemplate();