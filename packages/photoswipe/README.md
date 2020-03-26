# Photoswipe Module

## Install

```bash
npm install --save @ribajs/photoswipe
```

## Regist

To regist the module include `import photoswipeModule from '@ribajs/photoswipe';` in your `main.ts` file and regist the module with `riba.module.regist(photoswipeModule);`:

```ts
import { Riba, coreModule, Utils } from '@ribajs/core';
import { JQuery, photoswipeModule } from '@ribajs/photoswipe';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(photoswipeModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
