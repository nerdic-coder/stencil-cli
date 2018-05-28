#! /usr/bin/env node
var shell = require("shelljs");
const path = require('path');

// The path to the installation directory if this tool
var cliPath = path.join(path.dirname(__filename), '..');

// Check that a command is given
if (!process.argv[2]) {
    shell.echo('Please tell me what you want me todo!');
    shell.exit(1);
}

// Command for starting a new stencil starter app, example 'stencil start-app my-app'
if (process.argv[2] === 'start-app') {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
    
    var projectName = process.argv[3];
    if (!projectName) {
        shell.echo('Please state the project name after the "start-app" command.');
        shell.exit(1);
    }

    shell.exec('git clone https://github.com/ionic-team/stencil-app-starter ' + projectName);
    shell.cd(projectName);
    shell.echo('Running: git remote rm origin');
    shell.exec('git remote rm origin');
    shell.echo('Updating npm package names to ' + projectName + '.');
    shell.ls('package*.json').forEach(function (file) {
        shell.sed('-i', '@stencil/starter', projectName, file);
    });
    shell.echo('Running: npm install');
    shell.exec('npm install');
    shell.exit(0);
}

// Command for starting a new stencil component project, example 'stencil start-component my-component'
if (process.argv[2] === 'start-component') {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
    
    var projectName = process.argv[3];
    if (!projectName) {
        shell.echo('Please state the project name after the "start-component" command.');
        shell.exit(1);
    }

    shell.exec('git clone https://github.com/ionic-team/stencil-component-starter ' + projectName);
    shell.cd(projectName);
    shell.echo('Running: git remote rm origin');
    shell.exec('git remote rm origin');
    shell.echo('Updating npm package names to ' + projectName + '.');
    shell.ls('package*.json').forEach(function (file) {
        shell.sed('-i', 'my-component', projectName, file);
    });
    shell.echo('Updating namespace in stencil.config.js to ' + projectName + '.');
    shell.ls('stencil.config.js').forEach(function (file) {
        shell.sed('-i', 'mycomponent', projectName, file);
    });
    shell.echo('Updating script tag in index.html to ' + projectName + '.');
    shell.ls('src/index.html').forEach(function (file) {
        shell.sed('-i', 'mycomponent', projectName, file);
    });
    shell.echo('Running: npm install');
    shell.exec('npm install');
    shell.exit(0);
}

// Command for generating a new stencil component within any stencil project, example 'stencil generate my-component'
if (process.argv[2] === 'generate') {

    if (!process.argv[3]) {
        shell.echo('Please state the component name after the "generate" command.');
        shell.exit(1);
    }

    // The uppercase version of the component alias
    var componentName = capitalizeFirstLetter(process.argv[3]);
    // The tag name of the component alias
    var componentTag = process.argv[3].toLowerCase();

    var templatePath = path.join(cliPath, 'templates', 'component');

    // Create the right formats for the given component name
    if (componentName.includes('-')) {
        var componentParts = componentName.split("-");
        componentName = '';
        for(var part in componentParts) {
            componentName += capitalizeFirstLetter(componentParts[part]);
        }
    } else {
        var componentParts = componentName.split(/(?=[A-Z])/);
        componentTag = '';
        var first = true;
        for(var part in componentParts) {
            if (first) {
                componentTag += componentParts[part].toLowerCase();
            } else {
                componentTag += '-' + componentParts[part].toLowerCase();
            }
            first = false;
        }
    }

    // Create component folder
    shell.mkdir('src/components/' + componentTag);
    
    // Copy template files to the new component folder
    shell.cp(path.join(templatePath, 'component.css'), 'src/components/' + componentTag + '/' + componentTag + '.css');
    shell.cp(path.join(templatePath, 'component.spec.ts'), 'src/components/' + componentTag + '/' + componentTag + '.spec.ts');
    shell.cp(path.join(templatePath, 'component.tsx'), 'src/components/' + componentTag + '/' + componentTag + '.tsx');

    // Replace the placeholders with the component name and tag name
    shell.ls('src/components/' + componentTag + '/' + componentTag + '.*').forEach(function (file) {
        shell.sed('-i', 'COMPONENT_NAME', componentName, file);
        shell.sed('-i', 'COMPONENT_TAG', componentTag, file);
    });

    shell.echo('Generated stencil component "' + componentName + '".');
    shell.exit(0);
}

// Alias for starting a stencil development server
if (process.argv[2] === 'start') {
    shell.exec('npm start');
}
else if (process.argv[2] === 'test') {
    shell.echo('Use "npm run test" instead, jest was to unstable in the Stencil CLI.');
}
else if (process.argv[2] === 'test.watch') {
    shell.echo('Use "npm run test.watch" instead, jest was to unstable in the Stencil CLI.');
}
else {
    // If the command is not found try it as an alias for a npm run script.
    shell.exec('npm run ' + process.argv[2]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}