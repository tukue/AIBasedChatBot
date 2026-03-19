# ${{ values.name }}

${{ values.description }}

## Runtime defaults

- AWS region: `${{ values.awsRegion }}`
- Bedrock model: `${{ values.bedrockModelId }}`
- DynamoDB table: `${{ values.dynamodbTableName }}`

## Next steps

1. Add delivery workflows for your deployment environment.
2. Replace placeholder ownership and operational details.
3. Import the repository into your Backstage catalog if it is not auto-registered.
