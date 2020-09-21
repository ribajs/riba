# Extras Module

## Install

```bash
npm install --save @ribajs/extras
```

## Regist

To regist the module include `import extrasModule from '@ribajs/extras';` in your `main.ts` file and regist the module with `riba.module.regist(extrasModule);`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { extrasModule } from '@ribajs/extras';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
ready(() => {
  riba.bind(document.body, model);
});
```
