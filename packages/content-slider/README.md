# Content-Slider Module

## Install

```bash
npm install --save @ribajs/content-slider
```

## Regist

To regist the module include `import contentSlider from '@ribajs/content-slider';` in your `main.ts` file and regist the module with `riba.module.regist(contentSlider.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import { bs5Module } from "@ribajs/bs5";
import { extrasModule } from "@ribajs/extras";c
import { contentSlider } from '@ribajs/content-slider';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(contentSlider.init());
ready(() => {
  riba.bind(document.body, model);
});
```
