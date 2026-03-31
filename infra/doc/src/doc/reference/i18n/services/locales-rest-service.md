The `LocalesRestService` loads the translation tree from a URL (JSON). The response should use **language codes as top-level keys**, same as `LocalesStaticService`.

```typescript
import { LocalesRestService } from '@ribajs/i18n';

const url = 'https://example.com/api/locales.json';

const localesService = new LocalesRestService(url);
```

Constructor signature:

```text
new LocalesRestService(
  url: string,
  doNotRetranslateDefaultLanguage?: boolean,
  showMissingTranslation?: boolean,
  autoDetectLangcode?: boolean,
)
```

If the page runs in a Shopify theme context, the service may append `?shop=…` to the request (see implementation).
