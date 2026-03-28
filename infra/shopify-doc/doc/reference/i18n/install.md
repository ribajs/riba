```bash
npm install --save @ribajs/i18n
```

### Regist

To regist the module import `import i18nModule from '@ribajs/i18n';` and any `LocalesService` in your `main.ts` file and regist the module with `riba.module.register(i18nModule.init({localesService}));`:

```ts
import { coreModule, Riba } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import { LocalesService } from '@ribajs/shopify-tda';
import i18nModule from '@ribajs/i18n';
const riba = new Riba();
const localesService = new LocalesService();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(i18nModule.init({localesService}));
ready(() => {
  riba.bind(document.body, model);
});
```

### Templates

The module recognizes the default language code using the `lang` attribute of the `html` element, so this attribute is required for the installation:

```html
<!doctype html>
<html lang="{{'html.lang.code' |t}}">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```
