# Riba CLI

CLI tool to generate Riba projects and architecture elements.

## Description

In order to help people manage their projects, the CLI tool has been created. It helps on many grounds at once, from scaffolding the project to build well-structured applications. The Riba CLI is forked from [Nest CLI](https://github.com/nestjs/nest-cli) and  heavily based the [@angular-devkit](https://github.com/angular/devkit) package. Also, there're special schematics that are dedicated to the Riba development [@ribajs/schematics](https://github.com/ribajs/riba/tree/master/packages/schematics).

## Installation

```bash
npm install @ribajs/cli
```

## Development

### Debugging

We are using the [debug module](https://github.com/visionmedia/debug) for the debugging output.

To see the debugging output set the `DEBUG` environment variable:

```bash
DEBUG=* riba g component my-new-web-component
```

In order to debug the cli, you need to run with node in debugging mode:

```bash
node --inspect-brk $(which riba) g component my-new-web-component
```

### Schematics

If you work on the schematics you can use your local package by running:

```bash
npm link @ribajs/schematics
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B12684%2Fgithub.com%2Fribajs%2Friba.svg?type=large)](https://app.fossa.com/projects/custom%2B12684%2Fgithub.com%2Fribajs%2Friba?ref=badge_large)