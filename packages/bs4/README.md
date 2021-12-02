# Bootstrap 4 Module

## Install

```bash
npm install --save @ribajs/bs4
```

## Regist

To regist the module include `import bs4Module from '@ribajs/bs4';` in your `main.ts` file and regist the module with `riba.module.regist(bs4Module.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import bs4Module from '@ribajs/bs4';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
ready(() => {
  riba.bind(document.body, model);
});
```
