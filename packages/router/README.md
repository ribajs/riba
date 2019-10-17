# Router Module

## Install

```bash
npm install --save-dev @ribajs/router
```

## Regist

To regist the module include `import routerModule from '@ribajs/router';` in your `main.ts` file and regist the module with `riba.module.regist(routerModule);`:

```ts
import { Riba, JQuery } from '@ribajs/core';
import routerModule from '@ribajs/router';
const riba = new Riba();
const model = {};
riba.module.regist(routerModule);
JQuery(($: JQueryStatic) => {
  riba.bind(document.body, model);
});
```
