# Shopify - The Developer App Module

## Install

```bash
npm install --save-dev @ribajs/shopify-tda
```

## Regist

To regist the module include `import shopifyModule from '@ribajs/shopify-tda';` in your `main.ts` file and regist the module with `riba.module.regist(shopifyModule);`:

```ts
import { Riba, JQuery } from '@ribajs/core';
import shopifyTDAModule from '@ribajs/shopify-tda';
const riba = new Riba();
const model = {};
riba.module.regist(shopifyTDAModule);
JQuery(($: JQueryStatic) => {
  riba.bind(document.body, model);
});
```
