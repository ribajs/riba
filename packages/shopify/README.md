# Shopify Module

## Install

```bash
npm install --save-dev @ribajs/shopify
```

## Regist

To regist the module include `import shopifyModule from '@ribajs/shopify';` in your `main.ts` file and regist the module with `riba.module.regist(shopifyModule);`:

```ts
import { Riba, JQuery } from '@ribajs/core';
import shopifyModule from '@ribajs/shopify';
const riba = new Riba();
const model = {};
riba.module.regist(shopifyModule);
JQuery(($: JQueryStatic) => {
  riba.bind(document.body, this.model);
});
```
