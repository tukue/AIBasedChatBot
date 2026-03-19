# Backstage Portal

This Backstage app is scaffolded specifically for the `AIBasedChatBot` repository.

It is preconfigured to load:

- The root component and API from `../catalog-info.yaml`
- The chatbot scaffolder template from `../templates/create-bedrock-chatbot/template.yaml`
- Local team/system entities from `examples/`

## Start locally

```sh
cd backstage
yarn install
yarn start
```

## Required environment variables

Set a GitHub token if you want catalog import and GitHub publishing to work:

```sh
GITHUB_TOKEN=your_token_here
```

## Expected result

When the app starts, the catalog should show the `bedrock-chatbot` component and the create flow should show the `Create Bedrock Chatbot` template.
