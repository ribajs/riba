# fuse

```bash
npm install --save @ribajs/fuse
```

Riba.js module with utilities based on [Fuse.js](https://fusejs.io/).

## Register

To regist the module include `import fuseModule from '@ribajs/fuse';` in your `main.ts` file and regist the module with `riba.module.regist(fuseModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { fuseModule } from '@ribajs/fuse';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(fuseModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
