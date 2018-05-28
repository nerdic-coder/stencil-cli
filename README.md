# Stencil Command Line Interface
The unofficial command line interface for StencilJS.

## Installation

Stencil requires a recent LTS version of NodeJS and npm. Make sure you've installed and/or updated Node before continuing.

You can install the Stencil CLI globally with command,
```bash
npm i -g @tnc/stencil-cli
```

Now the `stencil` command should be available in your command line tool.

## Usage

### Reusable Components

You can create a reusable stencil component or library with command,
```bash
stencil start-component my-component
```

Where `my-component` is the name you want for the component or library.

This will create a folder with the basics that you need to develop your component.

You can read more about how to create and publish Stencil components in my article: [How I created and published my first Stencil component](https://nerdic-coder.com/2018/05/27/how-i-created-and-published-my-first-stencil-component/) 

### Building an app

You can build entire apps with Stencil, here is the command to get a starter app for Stencil,
```bash
stencil start-app my-app
```

Where `my-app` is the name you want for the app.

This will create a folder with the basics that you need to develop your awesome app.

### Generating a component

With the following command you can generate a new Stencil component in your exisiting Stencil projects,
```bash
stencil generate my-component
```

Where `my-component` is the name you want for the new component.

This will create a new folder for the component under `src/components`, with a css file, unit test spec.ts file and the component tsx file.

### Start development server

The following command is simply an alias to `npm start` that starts the Stencil development server.
```bash
stencil start
```

### Wildcard command

If you write any other command after `stencil` it acts like an alias for a npm run script.

For example `stencil build` will run the `npm run build` command.

## Contribute

If you see anything that can be improved just let me know or fix it in a pull request. :)

### Development

To help develop this tool start with cloning it down to your machine and run npm install.
```bash
git clone https://github.com/nerdic-coder/stencil-cli.git stencil-cli
cd stencil-cli
npm install
```

To test your local changes run the following in the stencil-cli folder,
```bash
npm link
```

and now you should be able to run the `stencil` command anywhere and your changes is reflected instantly.