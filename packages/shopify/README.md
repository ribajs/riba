# Shopify Module

## Install

### Riba and Riba Shopify

To install Riba and the Riba Shopify module:

```bash
npm install --save @ribajs/core @ribajs/utils @ribajs/shopify
```

### Tooling (TypeScript + modern bundler)

```bash
yarn add -D typescript vite @ribajs/tsconfig
```

### ESLint and Prettier

```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

If you use Visual Studio code it is recommended to install the following plugins:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

These two plugins help you run linting and formatting directly in the editor.

## Register Riba

To register the module, create a `src/ts/main.ts`, import `shopifyModule` from `@ribajs/shopify`, then register it with `riba.module.register(shopifyModule.init());`:

`main.ts` could look like this:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { shopifyModule } from '@ribajs/shopify';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(shopifyModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
## Build @ribajs/shopify

Some files are written in TypeScript. To build the files to JavaScript run

```bash
yarn run build
```

### Build postal codes

To build the exclude postalcode run

```bash
yarn run build:postalcodes
```

this will generate the JavaScript files localed in `src/js/checkout_exclude-express-postalcodes_XY.js`.
These files are used in the checkout to detect whether express shipping is allowed or not for the customer postal code.
