The abstract class **`LocalesService`** (`packages/i18n/src/services/locales.service.ts`) is the base of every locale source. It owns the language state — source language, active language, detection, persistence, fallback — and delegates the key lookup to the `Translator`. A subclass only says how the messages of one language are loaded.

| Class | Purpose |
| ----- | ------- |
| `LocalesStaticService` | messages of all languages are already in memory |
| `LocalesRestService` | messages are fetched over HTTP, one request per language |

### Methods

| Member | Description |
| ------ | ----------- |
| `init(): Promise<void>` | Detect the initial language and load its messages. Idempotent, every call returns the same promise, rejects on error. `i18nModule.init()` calls it for you. |
| `whenReady(): Promise<void>` | Same as `init()`, for code that awaits the readiness of a service someone else started. |
| `ready: boolean` | `true` after the first language is loaded. `translate()` and `lookup()` throw before that. |
| `setLangcode(langcode): Promise<void>` | Switch the language. Loads the messages first, rejects for an unknown language, emits `error` and keeps the active language when the load fails. Two quick switches resolve to the last one. |
| `preload(langcode): Promise<void>` | Load the messages of a language ahead of a switch. |
| `getLangcode(): string \| undefined` | The active language. |
| `getSourceLangcode(): string` | The language the markup is written in. |
| `getAvailableLangcodes(): Langcode[]` | The selectable languages with the active one marked. Reads the configured `langcodes`, never the loaded messages, so it does not wait for a request. |
| `translate(path, vars?, langcode?): string \| undefined` | Read a message and apply the `missing` strategy. Throws while the service is not ready. |
| `lookup(path, vars?, langcode?): string \| undefined` | Read a message without the `missing` strategy and without the `missing` event. `undefined` means no language of the fallback chain has the key. |
| `has(path, langcode?): boolean` | Does the active language or a fallback have the key. |
| `on(name, callback): () => void` | Subscribe to `ready`, `changed`, `missing` or `error`, returns the unsubscribe function. |
| `event: EventDispatcher` | The raw dispatcher, for `once()` and `off()`. |
| `dispose()` | Remove all listeners and cached messages. The service is unusable afterwards. |

`path` is a dot separated key path or an array of segments; `vars` fills the `{{ placeholders }}` of the message. Both `translate()` and `lookup()` use the active language unless you pass a `langcode` yourself.

### Keys and fallback

The fallback is per key, not per language: `de-AT` is looked up as `de-AT`, then `de`, then every entry of the `fallbackLangcodes` option. The first language that has the key wins, the others are not consulted for that key.

```typescript
await localesService.setLangcode("de-AT");
// de-AT -> de -> en -> it (the variants of fallbackLangcodes)
localesService.translate("form.newsletter.title");
```

A message is either a string or a set of plural forms selected by the `count` variable:

```typescript
const locales = {
  de: {
    cart: {
      items: { one: "{{ count }} Artikel", other: "{{ count }} Artikel" },
    },
  },
};
```

`zero`, `one` and `two` win when `count` is exactly that number, the rest follows `Intl.PluralRules` for the active language, and `other` is the last resort. An empty string is a valid message, so you can blank a text without a fallback.

### Options

`LocalesOptions` is the second constructor argument of both services:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `sourceLangcode` | `string` | `lang` attribute of `<html>`, otherwise `en` | The language the markup is written in |
| `langcodes` | `string[]` | the keys of the catalog (static service only) | The selectable languages |
| `fallbackLangcodes` | `string[]` | `[]` | Tried per key after the active language and its base language |
| `detect` | `Array<"query" \| "storage" \| "html" \| "navigator">` | `["html"]` | Where to look for the initial language, first match wins |
| `queryParam` | `string` | `lang` | The query parameter read by `detect: ["query"]` |
| `storageKey` | `string` | `riba:i18n:langcode` | The `localStorage` key used by `persist` and `detect: ["storage"]` |
| `persist` | `boolean` | `false` | Remember the language the user picks in `localStorage` |
| `syncHtmlLang` | `boolean` | `true` | Write the active language to the `lang` attribute of `<html>` |
| `missing` | `"keep" \| "marker" \| "throw"` | `"keep"` | What `translate()` does with a key no language has: return `undefined` (the binder keeps the source markup), return `translation missing: "key"`, or throw |

### Your own service

Extend `LocalesService` and implement `load()`, which resolves the messages of one language or `undefined` if it has none:

```typescript
import {
  LocalesService,
  type LocalesOptions,
  type MessageTree,
} from "@ribajs/i18n";

class MyLocalesService extends LocalesService {
  constructor(protected readonly endpoint: string, options: LocalesOptions) {
    super(options);
  }

  protected async load(langcode: string): Promise<MessageTree | undefined> {
    const response = await fetch(`${this.endpoint}/${langcode}.json`);
    return response.ok ? await response.json() : undefined;
  }
}
```

`load()` is called once per language, concurrent callers share the same promise, and the resolved messages are cached; a load that rejected is retried by the next switch.

Override `resolveLangcodes(): Promise<string[]>` when the selectable languages are not known upfront; it is called once by `init()`, before the first `load()`:

```typescript
protected async resolveLangcodes(): Promise<string[]> {
  const response = await fetch(`${this.endpoint}/index.json`);
  return response.ok ? await response.json() : [];
}
```

Inside both you may use `this.langcodes` and `this.sourceLangcode`, and in a subclass of `LocalesRestService` also `this.urlFor(langcode)` and `this.fetchJSON(url)`. Without an override of `resolveLangcodes()`, `init()` rejects when the `langcodes` option is missing.
