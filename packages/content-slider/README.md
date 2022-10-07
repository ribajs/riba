# Content-Slider Module

## Install

```bash
npm install --save @ribajs/content-slider
```

## Regist

To regist the module include `import contentSlider from '@ribajs/content-slider';` in your `main.ts` file and regist the module with `riba.module.register(contentSlider.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import { bs5Module } from "@ribajs/bs5";
import { extrasModule } from "@ribajs/extras";c
import { contentSlider } from '@ribajs/content-slider';
const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init());
riba.module.register(extrasModule.init());
riba.module.register(contentSlider.init());
ready(() => {
  riba.bind(document.body, model);
});
```
