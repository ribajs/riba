# Shopify Module

## Install

```bash
npm install --save @ribajs/shopify
```

## Regist

To regist the module include `import shopifyModule from '@ribajs/shopify';` in your `main.ts` file and regist the module with `riba.module.regist(shopifyModule);`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { shopifyModule } from '@ribajs/shopify';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(shopifyModule);
ready(() => {
  riba.bind(document.body, model);
});
```
