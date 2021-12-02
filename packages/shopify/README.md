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

Add webpack to `resolutions` in your package.json to be shure to use the latest Webpack v4 version:

```json
"resolutions": {
  "webpack": "^4.42.1"
}
```

### Gulp 4 and (Slate) tools

```bash
yarn add -D gulp gulp-cheerio gulp-ext-replace gulp-plumber gulp-rename gulp-size gulp-svgmin gulp-util gulp-zip @ribajs/webpack-config
```

## Regist Riba

To regist the module create a `src/ts/main.ts` and insert `import shopifyModule from '@ribajs/shopify';`, than you can regist the module with `riba.module.regist(shopifyModule.init());`:

The main.ts could look like this:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { shopifyModule } from '@ribajs/shopify';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(shopifyModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```

## Gulp

Add a gulp file to your theme project like this

```js
/**
 * For this reason the slate is depricated this is a own gulpfile like the original gulpfile used in slate but with some customisations
 * @see https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/gulpfile.js
 */
require('source-map-support').install(); // Used to inspect the code for debugging
const path = require("path");
const gutil = require("gulp-util");
const argv = require("yargs").argv;
const requireDir = require("require-dir");

// Gets the gulp tasks path of @ribajs/shopify
const ribaShopifyTaskDir = path.resolve(
  path.dirname(require.resolve("@ribajs/shopify/package.json")),
  "build-system",
  "dist",
  "tasks"
);

if (argv.environment && argv.environment !== "undefined") {
  console.log(`setting tkEnvironments to ${argv.environment}`);
  gutil.env.environments = argv.environment;
}

// imports gulp tasks from the @ribajs/shopify's `build-system/dist/tasks` directory
requireDir(ribaShopifyTaskDir);
```

### Gulp tasks

#### Generate config.deploy.yml

After you have create a basic `config.deploy.yml` you can run the command below to insert the latest created themes (which are usually the next release themes) in your `config.deploy.yml`.

```bash
gulp generate:config:deploy
```

#### Get a list of the youngest / next release themes

To make it easier to publish the current preview links of the release themes in the chat you can use the following command:

```bash
gulp themes:list:youngest
```

Example output:

```text
...

======  UK  ======
Name:   release/1.3.17 | New variant switcher
ID:     81177935933
Store:  my-store.myshopify.com
Created:        Today at 9:10 AM
Updated:        Today at 10:03 AM
Edit settings:   https://my-store.myshopify.com/admin/themes/81177935933/editor
Edit code:       https://my-store.myshopify.com/admin/themes/81177935933
Preview:         https://my-store.myshopify.com/?_ab=0&_fd=0&_sc=1&preview_theme_id=81177935933

...
```

### Config files

`config.deploy.yml`:

```yaml
# Rename this file to config.deploy.yml to use it with `npm run deploy`
staging:
  password:
  theme_id: 80030728250 # release/april-21-2020
  store: my-store-staging.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
de:
  password:
  theme_id: 79757934703 # release/april-21-2020
  store: my-store-de.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
eu:
  password:
  theme_id: 81227481159 # release/april-21-2020
  store: my-store-au.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
fr:
  password:
  theme_id: 79767437399 # release/april-21-2020
  store: my-store-fr.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
uk:
  password:
  theme_id: 79777366077 # release/april-21-2020
  store: my-store-uk.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
us:
  password:
  theme_id: 80021160036 # release/april-21-2020
  store: my-store-us.myshopify.com
  ignore_files:
    - config/settings_data.json
    - locales/*
```

`release.yml`:

```yaml
bitbucket:
  username: # your bitbucket userbame
  password: # your bitbucket password
  workspace: # ee.g. rfd
  repo_slug: # e.g. my-store

```

## Deploy

To deploy this branch to all shops just create a `config.deploy.yml` with an environment for each shop like in the `config-sample.deploy.yml` and run

```bash
gulp deploy
```

You can pass a custom config.yml file name like this:

```bash
gulp deploy:prod -- --config="config.deploy.yml"
gulp watch:dev -- --config="config.staging.yml"
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
