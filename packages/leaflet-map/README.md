# TaggedImage Module

## Install

```bash
npm install --save @ribajs/taggedimage
```

## Regist

To regist the module include `import taggedimageModule from '@ribajs/taggedimage';` in your `main.ts` file and regist the module with `riba.module.regist(taggedimageModule);`:

```ts
import { Riba, coreModule, Utils } from '@ribajs/core';
import { JQuery, taggedimageModule } from '@ribajs/taggedimage';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(taggedimageModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
