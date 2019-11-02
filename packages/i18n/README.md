# Internationalization Module

## Install

```bash
npm install --save-dev @ribajs/i18n
```

## Regist

To regist the module include `import i18nModule from '@ribajs/i18n';` in your `main.ts` file and regist the module with `riba.module.regist(i18nModule(localesService));`:

```ts
import { Riba, Utils } from '@ribajs/core';
import { LocalesService } from '@ribajs/shopify-tda';
import i18nModule from '@ribajs/i18n';
const riba = new Riba();
const localesService = new LocalesService();
const model = {};
riba.module.regist(i18nModule(localesService));
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
