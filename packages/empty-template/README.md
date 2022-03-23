# empty-template

```bash
npm install --save @ribajs/empty-template
```

Empty Riba.js module, can be used as template for new modules.

## Register

To regist the module include `import emptyTemplateModule from '@ribajs/empty-template';` in your `main.ts` file and regist the module with `riba.module.regist(emptyTemplateModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { emptyTemplateModule } from '@ribajs/empty-template';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(emptyTemplateModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
