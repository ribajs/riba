# Shopify - The Developer App Module

## Install

```bash
npm install --save @ribajs/shopify-tda
```

## Regist

To regist the module include `import shopifyModule from '@ribajs/shopify-tda';` in your `main.ts` file and regist the module with `riba.module.regist(shopifyModule);`:

```ts
import { Riba, Utils } from '@ribajs/core';
import shopifyTDAModule from '@ribajs/shopify-tda';
const riba = new Riba();
const model = {};
riba.module.regist(shopifyTDAModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
