# Shopify - The Developer App Module

## Install

```bash
npm install --save @ribajs/shopify-tda
```

## Regist

To regist the module include `import shopifyModule from '@ribajs/shopify-tda';` in your `main.ts` file and regist the module with `riba.module.regist(shopifyModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { shopifyTDAModule } from '@ribajs/shopify-tda';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(shopifyTDAModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
