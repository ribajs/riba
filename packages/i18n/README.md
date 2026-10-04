# Internationalization Module

Client-side translations for Riba. One locale service owns the language state; the `rv-i18n-*` binders, the `t` formatter and the `i18n-switcher` component all read from it.

The markup is written in the source language (default: the `lang` attribute of `<html>`, otherwise `en`). A key that no language translates keeps the markup it had, so a partially translated page stays readable.

## Install

```bash
npm install --save @ribajs/i18n
```

## Register

Import `i18nModule` and a `LocalesService` implementation in your `main.ts` file and register the module with `riba.module.register(i18nModule.init({ localesService }))`. `init()` calls `localesService.init()` for you: it detects the language, loads its messages and emits the `ready` event.

```ts
import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom.js";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

const locales = {
  de: {
    form: {
      newsletter: { title: "Newsletter abonnieren" },
    },
  },
  en: {
    form: {
      newsletter: { title: "Sign up for the newsletter" },
    },
  },
};

const riba = new Riba();
const localesService = new LocalesStaticService(locales, {
  sourceLangcode: "en",
  detect: ["query", "storage", "html"],
  persist: true,
});

riba.module.register(coreModule.init());
riba.module.register(i18nModule.init({ localesService }));

ready(() => {
  riba.bind(document.body, {});
});
```

```html
<html lang="en">
  ...
  <h1 rv-i18n-text="'form.newsletter.title'">Sign up for the newsletter</h1>
  <p>{ 'form.newsletter.title' | t }</p>
</html>
```

`LocalesStaticService` holds every language in memory, so any language can be read without loading anything. The root keys of the catalog are the language codes; without the `langcodes` option they are the catalog keys.

## Load messages over HTTP

`LocalesRestService` requests one file per language the first time the language is needed and caches the response, which keeps the initial payload small:

```ts
import { LocalesRestService } from "@ribajs/i18n";

const localesService = new LocalesRestService(
  (langcode) => `/locales/${langcode}.json`,
  {
    langcodes: ["en", "de", "fr"],
    sourceLangcode: "en",
  },
);
```

Each file contains the message tree of that one language:

```json
{
  "form": {
    "newsletter": {
      "title": "Newsletter abonnieren"
    }
  }
}
```

`langcodes` is required here, because the service cannot know which languages exist: without it `init()` rejects. The catalog of the source language is never requested — the markup is the source — unless you set `loadSourceCatalog: true`.

## Switch the language

`setLangcode()` is asynchronous: it loads the messages before it applies the language, so `translate()` reads synchronously in the `changed` listener. It rejects for a language it does not know and keeps the active language when the request fails.

```ts
await localesService.setLangcode("de");
```

With `syncHtmlLang` (default) the `lang` attribute of `<html>` follows the active language, so `:lang()` selectors see the change too.

## Options

All options of `LocalesOptions`, passed as the second constructor argument of either service:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `sourceLangcode` | `string` | `lang` attribute of `<html>`, otherwise `en` | The language the markup is written in |
| `langcodes` | `string[]` | the keys of the catalog (static service only) | The selectable languages |
| `fallbackLangcodes` | `string[]` | `[]` | Tried per key after the active language and its base language |
| `detect` | `Array<"query" \| "storage" \| "html" \| "navigator">` | `["html"]` | Where to look for the initial language, first match wins |
| `queryParam` | `string` | `lang` | The query parameter read by `detect: ["query"]` |
| `storageKey` | `string` | `riba:i18n:langcode` | The `localStorage` key used by `persist` and `detect: ["storage"]` |
| `persist` | `boolean` | `false` | Remember the language the user picks in `localStorage` |
| `syncHtmlLang` | `boolean` | `true` | Write the active language to the `lang` attribute of `<html>` |
| `missing` | `"keep" \| "marker" \| "throw"` | `"keep"` | What `translate()` does with a key no language has |

`LocalesRestService` adds one option:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `loadSourceCatalog` | `boolean` | `false` | Also request the messages of the source language |

Every access to `document`, `location`, `navigator` and `localStorage` is guarded, so the services also run without a DOM.

## Reference

[Reference documentation](https://ribajs.com/pages/i18n): events, the `LocalesService` base class, both services, the `rv-i18n-*` binders, the `t` formatter and the `i18n-switcher` component.
