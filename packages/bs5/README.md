# Bootstrap 5 Module

## Install

```bash
npm install --save @ribajs/bs5
```

## Regist

To regist the module include `import bs5Module from '@ribajs/bs5';` in your `main.ts` file and regist the module with `riba.module.regist(bs5Module.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import bs5Module from '@ribajs/bs5';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init());
ready(() => {
  riba.bind(document.body, model);
});
```
