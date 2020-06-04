# Tagged Image Module

## Install

```bash
npm install --save @ribajs/tagged-image
```

## Regist

To regist the module include `import taggedImageModule from '@ribajs/tagged-image';` in your `main.ts` file and regist the module with `riba.module.regist(taggedImageModule);`:

```ts
import { Riba, coreModule, Utils } from '@ribajs/core';
import { taggedImageModule } from '@ribajs/tagged-image';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(taggedImageModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
