# Lottie

[Lottie Web Player](https://lottiefiles.com/web-player) ported to Riba.js

```bash
npm install --save @ribajs/lottie
```

Empty Riba.js module, can be used as template for new modules.

## Register

To regist the module include `import LottieModule from '@ribajs/lottie';` in your `main.ts` file and regist the module with `riba.module.register(LottieModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { LottieModule } from '@ribajs/lottie';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(LottieModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
