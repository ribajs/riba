The `LocalesRestService` fetches the messages over HTTP with `HttpService.getJSON()`. It requests one file per language the first time that language is needed, caches the response and requests nothing else, which keeps the initial payload small.

```typescript
import { LocalesRestService } from "@ribajs/i18n";

const localesService = new LocalesRestService((langcode) => `/locales/${langcode}.json`, {
  langcodes: ["en", "de", "fr"],
  sourceLangcode: "en",
});
```

```typescript
new LocalesRestService(url: string | ((langcode: string) => string), options?: LocalesRestOptions)
```

Each file contains the message tree of that one language, without the langcode as a wrapper:

```json
{
  "form": {
    "newsletter": {
      "title": "Newsletter abonnieren"
    }
  }
}
```

A missing `url` throws in the constructor. `langcodes` is required in the options, because the service cannot know which languages the server offers: without it, and without an override of `resolveLangcodes()`, `init()` rejects.

### Lazy per language

`init()` loads the detected language and the languages of its fallback chain, nothing else. `setLangcode()` loads the language it is asked for before it applies it. Every response is cached, so switching back and forth requests a file once; a request that failed is not cached and is retried by the next switch.

The catalog of the source language is never requested, because the markup is the source. Set `loadSourceCatalog: true` to fetch it as well.

```typescript
await localesService.setLangcode("de");
// one request for /locales/de.json, then `translate()` reads synchronously
localesService.translate("form.newsletter.title");
```

A failed request rejects the `setLangcode()` promise, emits `error` and leaves the active language in place.

### One file for all languages

Pass a fixed `url` and pick the messages of the requested language out of the response with `parse()`. Requests to the same url are shared, so one file serves every switch:

```typescript
import { LocalesRestService, type LocalesRestOptions, type MessageTree } from "@ribajs/i18n";

class ThemeLocalesService extends LocalesRestService {
  constructor(baseUrl: string, options: LocalesRestOptions = {}) {
    super(`${baseUrl}/locales`, options);
  }

  protected parse(body: unknown, langcode: string): MessageTree | undefined {
    return (body as Record<string, MessageTree>)[langcode];
  }

  protected async resolveLangcodes(): Promise<string[]> {
    const body = (await this.fetchJSON(this.urlFor(this.sourceLangcode))) as object;
    return Object.keys(body);
  }
}
```

`/locales` then returns `{ "de": { … }, "fr": { … } }` and `init()` reads the languages from its keys.

### Hooks

| Member | Description |
| ------ | ----------- |
| `protected buildUrl(url, langcode)` | Change the url right before it is requested, e.g. to add a query |
| `protected parse(body, langcode)` | Pick the messages of one language out of the response body |
| `protected resolveLangcodes()` | The selectable languages, called once by `init()` instead of the `langcodes` option |
| `protected urlFor(langcode)` | The url of one language, `buildUrl()` applied |
| `protected fetchJSON(url)` | `HttpService.getJSON()` with the response cache, returns the parsed body |

`packages/shopify-tda/src/services/locales.service.ts` is a real implementation of these hooks: the `?shop=…` query of the Shopify backend lives in its `buildUrl()`, the messages of all languages arrive in one file, which `resolveLangcodes()` and `parse()` read.

See [LocalesService](locales-base-service.md) for the shared options, the fallback rules and the events.
