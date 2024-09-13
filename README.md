# Frontend template for NBC

Nodeblocks Cloud (NBC) also supports frontend deployment by selecting the custom service option.
This repository contains templates for creating a frontend.

## ⚙️ Setup

### Install Node.js

This project requires Node.js to be installed on your machine. Install the latest [Node.js](https://nodejs.org/en/download/) 18+ LTS version directly, or through [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Prepare NPM Auth Token

This project depends on npm packages hosted in a private npm registry.
You will need a `npm auth token` in order to access these packages.
Please prepare this token using the steps below before continuing with setup.

1. Ask Nodeblocks team for a valid `npm auth token`.
1. Add the token as `BASALDEV_AUTH_TOKEN` to your local environment - `.zshrc` `.bashrc` etc

```bash
export BASALDEV_AUTH_TOKEN=__INSERT_YOUR_TOKEN_HERE__
```

### Create a repository

You can either fork the repository or manually copy the necessary files.

### Install Dependencies

Run the following command to install the required dependencies:

```bash
npm ci
```

The dependencies includes both `@basaldev/blocks-frontend-framework` and `@basaldev/blocks-frontend-sdk`, making it easy to customize your code.

## 💡 Usage

### Development

Run the following command to start the application in development mode:

```bash
npm run dev
```

This command will start the application in development mode with hot reloading enabled. The application will automatically restart when you make changes to the code.

### Deployment

Once you are ready to deploy, on the NBC editor page, click the **Add service** button and select the **Custom** option. You will be prompted to input a name for your frontend and the SSH url to the repository.

Make sure to register the deploy key provided by NBC to your deploy keys for the selected repository. Once you press the ok button, you will no longer be able to navigate back and will need to generate a new key.

Before hitting the deploy button, under the **Service Configs** bar, make sure to click **Add EnvVar** and add your `BASALDEV_AUTH_TOKEN`, along with any other environment variables you have added.
