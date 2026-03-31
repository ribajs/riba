```bash
npm install --save @ribajs/i18n
```

### Register

Import `i18nModule` and a `LocalesService` implementation (for example `LocalesStaticService`), then register the module:

```ts
import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom.js";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

const locales = {
  en: {
    examples: {
      newsletter: { title: "Hello" },
    },
  },
};

const riba = new Riba();
const localesService = new LocalesStaticService(locales);
const model = {};

riba.module.register(coreModule.init());
riba.module.register(i18nModule.init({ localesService }));

ready(() => {
  riba.bind(document.body, model);
});
```

The root keys of the `locales` object must be **language codes** (`en`, `de`, …). See [LocalesStaticService](services/locales-static-service.md).

A default export exists only in the browser bundle (`browser.ts`); from the main package entry use **named** imports: `import { i18nModule } from '@ribajs/i18n'`.

### Templates

The module reads the default language from the `lang` attribute on `<html>`. Set it to one of your locale keys (e.g. `en` or `de`):

```html
<!doctype html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```
