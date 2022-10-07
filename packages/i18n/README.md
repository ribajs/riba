# Internationalization Module

## Install

```bash
npm install --save @ribajs/i18n
```

## Regist

To regist the module import `import i18nModule from '@ribajs/i18n';` and any `LocalesService` in your `main.ts` file and regist the module with `riba.module.register(i18nModule.init({ localesService }));`:

```ts
import { coreModule, Riba } from '@ribajs/core';
import { LocalesService } from '@ribajs/shopify-tda';
import i18nModule from '@ribajs/i18n';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const localesService = new LocalesService();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(i18nModule.init({ localesService }));
ready(() => {
  riba.bind(document.body, model);
});
```
