# Core Module

## Install

```bash
npm install --save-dev @ribajs/core
```

## Regist

To regist the module include `import coreModule from '@ribajs/core';` in your `main.ts` file and regist the module with `riba.module.regist(coreModule);`:

```ts
import { Riba, JQuery, coreModule } from '@ribajs/core';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
JQuery(($: JQueryStatic) => {
  riba.bind(document.body, model);
});
```
