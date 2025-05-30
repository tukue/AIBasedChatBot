#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting CloudFormation template validation...${NC}"

# Step 1: Validate template syntax using AWS CLI
echo -e "\n${YELLOW}Step 1: Validating template syntax with AWS CLI...${NC}"
aws cloudformation validate-template --template-body file://template.yaml

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Template syntax is valid!${NC}"
else
  echo -e "${RED}✗ Template syntax validation failed!${NC}"
  exit 1
fi

# Step 2: Check for missing resources or references
echo -e "\n${YELLOW}Step 2: Checking for missing DynamoDB table resource...${NC}"
if grep -q "DynamoDBTable:" template.yaml; then
  echo -e "${GREEN}✓ DynamoDB table resource found!${NC}"
else
  echo -e "${RED}✗ DynamoDB table resource is missing but referenced in IAM policy!${NC}"
  exit 1
fi

# Step 3: Verify parameter references
echo -e "\n${YELLOW}Step 3: Verifying parameter references...${NC}"
PARAMS=("S3BucketName" "DynamoDBTableName" "BedrockModelId" "BotName")
MISSING=0

for PARAM in "${PARAMS[@]}"; do
  if grep -q "!Ref $PARAM" template.yaml; then
    echo -e "${GREEN}✓ Parameter $PARAM is referenced correctly${NC}"
  else
    echo -e "${YELLOW}⚠ Parameter $PARAM is defined but might not be used${NC}"
  fi
done

# Step 4: Check Lambda code for hardcoded values
echo -e "\n${YELLOW}Step 4: Checking Lambda code for hardcoded values...${NC}"
if grep -q "YOUR_BEDROCK_MODEL_ID" template.yaml; then
  echo -e "${RED}✗ Lambda code contains hardcoded placeholder 'YOUR_BEDROCK_MODEL_ID'${NC}"
  echo -e "${YELLOW}  Recommendation: Replace with !Ref BedrockModelId${NC}"
  MISSING=1
fi

if grep -q "YOUR_DYNAMODB_TABLE_NAME" template.yaml; then
  echo -e "${RED}✗ Lambda code contains hardcoded placeholder 'YOUR_DYNAMODB_TABLE_NAME'${NC}"
  echo -e "${YELLOW}  Recommendation: Replace with !Ref DynamoDBTableName${NC}"
  MISSING=1
fi

if [ $MISSING -eq 0 ]; then
  echo -e "${GREEN}✓ No obvious hardcoded placeholders found${NC}"
fi

# Step 5: Check for missing DynamoDB table resource
echo -e "\n${YELLOW}Step 5: Checking for DynamoDB table resource...${NC}"
if ! grep -q "Type: AWS::DynamoDB::Table" template.yaml; then
  echo -e "${RED}✗ Missing DynamoDB table resource but referenced in IAM policy!${NC}"
  echo -e "${YELLOW}  Recommendation: Add DynamoDB table resource definition${NC}"
  exit 1
else
  echo -e "${GREEN}✓ DynamoDB table resource found!${NC}"
fi

echo -e "\n${GREEN}Template validation completed!${NC}"