# Shopify Module

## Install

### Riba and Riba Shopify

To install Riba and the Riba Shopify module:

```bash
npm install --save @ribajs/core @ribajs/utils @ribajs/shopify
```

### Babel

```bash
yarn add -D @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-proposal-optional-chaining @babel/plugin-syntax-export-default-from @babel/plugin-transform-runtime @babel/preset-env @babel/preset-typescript @babel/runtime-corejs3 babel-plugin-array-includes
```

### ESLint and Prettier

```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/experimental-utils @typescript-eslint/parser @typescript-eslint/typescript-estree
```

If you use Visual Studio code it is recommended to install the following plugins:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

These two plugins automatically use the .eslintrc.js from thisk repository, the first plugin shows you possible errors, the second one formats your code automatically when you save it.

### Webpack, Yarn PnP and TypeScript

```bash
yarn add -D webpack webpack-cli webpack-stream typescript @yarnpkg/pnpify html-loader babel-loader
```

Add webpack to `resolutions` in your package.json to be sure to use the latest Webpack v4 version:

```json
"resolutions": {
  "webpack": "^4.42.1"
}
```

## Regist Riba

To regist the module create a `src/ts/main.ts` and insert `import shopifyModule from '@ribajs/shopify';`, than you can regist the module with `riba.module.register(shopifyModule.init());`:

The main.ts could look like this:

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
