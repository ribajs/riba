# Core Module

## Install

```bash
npm install --save @ribajs/core
```

## Regist

To regist the module include `import coreModule from '@ribajs/core';` in your `main.ts` file and regist the module with `riba.module.regist(coreModule);`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
ready(() => {
  riba.bind(document.body, model);
});
```
