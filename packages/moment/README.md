# Moment Module

A set of date formatters, some of them from https://github.com/matthieuriolo/rivetsjs-stdlib

## Install

```bash
npm install --save @ribajs/moment
```

## Regist

To regist the module include `import momentModule from '@ribajs/moment';` in your `main.ts` file and regist the module with `riba.module.regist(momentModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { momentModule } from '@ribajs/moment';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(momentModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
