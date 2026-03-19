#!/bin/bash

# Get region from environment variable or use default
AWS_REGION=${AWS_REGION:-"us-east-1"}
echo "Using AWS region: $AWS_REGION"

# Validate CloudFormation template
echo "Validating CloudFormation template..."
aws cloudformation validate-template --template-body file://template.yaml --region $AWS_REGION

if [ $? -eq 0 ]; then
  echo "Template is valid!"
else
  echo "Template validation failed!"
fi