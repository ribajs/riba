# BS5 Photoswipe Module

## Install

```bash
npm install --save @ribajs/bs5-photoswipe
```

## Regist

To regist the module include `import { bs5PhotoswipeModule } from '@ribajs/bs5-photoswipe';` in your `main.ts` file and regist the module with `riba.module.register(bs5PhotoswipeModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { bs5PhotoswipeModule } from '@ribajs/bs5-photoswipe';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(bs5PhotoswipeModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
