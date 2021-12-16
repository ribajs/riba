# Node SSR example

## CLI

To start the CLI example execute: 

```bash
yarn run start:cli
```

As you can see in the package.json, this executes the following command:

```bash
ssr --component=hello-ssr-page --source-file-dir=./assets/ssr --template-dir=. --pretty=true
```

## API

To start the API example execute:

```bash
yarn run start:api
```

This executes the [api.ts](./api.ts) from the root directory of this example.