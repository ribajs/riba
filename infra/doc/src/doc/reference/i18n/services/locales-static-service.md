The `LocalesStaticService` holds the messages of all languages in memory, which suits a bundled app, a demo or a small set of UI strings. Any language can be read without loading anything, so the service never emits a request and works without a DOM.

```typescript
import { LocalesStaticService } from "@ribajs/i18n";

const locales = {
  de: {
    examples: {
      newsletter: {
        description_html:
          "Abonnieren Sie unseren Newsletter und erhalten Sie <strong>10% Rabatt</strong> auf Ihren nächsten Einkauf.",
        input_value: "Unbekannt",
        placeholder_last_name: "Nachname",
        title: "Melde dich für den Newsletter an",
      },
    },
  },
  en: {
    examples: {
      newsletter: {
        description_html:
          "Subscribe to our newsletter and get <strong>10% off</strong> your next purchase.",
        input_value: "Unknown",
        placeholder_last_name: "Surname",
        title: "Sign up for the newsletter",
      },
    },
  },
};

const localesService = new LocalesStaticService(locales);
```

The root keys of `locales` are the **language codes** (`de`, `en`, …). Do not wrap the messages in an extra property such as `locales`: a lookup of `examples.newsletter.title` would resolve against `en.locales.examples…` and find nothing. The nested keys are the key paths the binders and the `t` formatter use.

```typescript
new LocalesStaticService(catalog: Catalog, options?: LocalesOptions)
```

Without the `langcodes` option the catalog keys are the selectable languages. Set the option to offer a subset of them, or to add a language whose messages are not in the catalog:

```typescript
const localesService = new LocalesStaticService(locales, {
  sourceLangcode: "en",
  langcodes: ["en", "de", "fr"],
  detect: ["query", "storage", "html"],
  persist: true,
});
```

Since the source language is the language of your markup, you can leave its entry out of the catalog: its messages are not needed, and a key without a message keeps the markup the element had. Keep in mind that a catalog entry of the source language *does* win over the markup for the keys it contains.

The service only implements `load()`, which reads the catalog; detection, persistence and the fallback chain come from `LocalesService`. See [LocalesService](locales-base-service.md) for the options and the fallback rules, [LocalesRestService](locales-rest-service.md) for messages that are not bundled.
