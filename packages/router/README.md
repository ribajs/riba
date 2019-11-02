# Router Module

The router module is based on [barba.js v1](https://barba.js.org/) but was converted to typescript and adapted to a few to our needs for this module. To understand how this module works, we still recommend to read the documentation how barba.js works.

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

## Future

As soon as we have time we will check if barba v2 is suitable for our module and will maybe change it to use barba v2.
