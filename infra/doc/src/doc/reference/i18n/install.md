```bash
npm install --save @ribajs/i18n
```

### Register

Import `i18nModule` and a `LocalesService` implementation (for example `LocalesStaticService`), then register the module. The option `localesService` is required; `i18nModule.init()` calls `localesService.init()` for you, which detects the language, loads its messages and emits the `ready` event.

```ts
import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom.js";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

const locales = {
  de: {
    examples: {
      newsletter: { title: "Melde dich für den Newsletter an" },
    },
  },
  en: {
    examples: {
      newsletter: { title: "Sign up for the newsletter" },
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

The root keys of the `locales` object are the **language codes** (`de`, `en`, …) and become the selectable languages. See [LocalesStaticService](services/locales-static-service.md).

Every binder, formatter and component of the module reads from that one service, so only one instance can be registered. Registering the same service again is a no-op, a second different service throws; `I18nService.reset()` forgets it again, mainly for tests.

A default export exists only in the browser bundle (`browser.ts`); from the main package entry use **named** imports: `import { i18nModule } from '@ribajs/i18n'`.

### Source language

The markup is written in the source language. It defaults to the `lang` attribute of `<html>`, and you can set it explicitly with the `sourceLangcode` option:

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

With `sourceLangcode: "en"` the service reads `<html lang="de">` as a request for `de` and still treats `en` as the language of your markup.

A key that neither the active language nor the fallback chain translates keeps the markup the element had, so you can translate a page step by step. See [rv-i18n-[type]](binders/i18n-[type].md) and the `missing` option in [LocalesService](services/locales-base-service.md).

### Detect and remember the language

`init()` looks for the initial language in the order of the `detect` option (`["html"]` by default), the first available match wins:

| Source | Reads |
| ------ | ----- |
| `query` | the query parameter `lang`, configurable with `queryParam` |
| `storage` | `localStorage`, key `storageKey` (`riba:i18n:langcode` by default) |
| `html` | the `lang` attribute of `<html>` |
| `navigator` | `navigator.languages`, then `navigator.language` |

A candidate is matched against the available languages without case and region, so `de-AT` picks `de`. If nothing matches, the source language is active.

With `persist: true` the language the user picks through `setLangcode()` is written to `localStorage`; a detected language is not written. Every access to `document`, `location`, `navigator` and `localStorage` is guarded, so the services run without a DOM.
