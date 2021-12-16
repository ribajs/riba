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

## Node.js API

To start the API example execute:

```bash
yarn run start:node
```

This executes the [api.ts](./api.ts) with Node.js (using ts-node) from the root directory of this example.

## Deno API

To start the Deno API example execute:

```bash
yarn run start:deno
```

This executes the [deno-api.ts](./deno-api.ts) with Deno from the root directory of this example.

The Deno command which will be executed is:

```bash
deno run --config ./deno.json --allow-env --allow-run deno-api.ts
```