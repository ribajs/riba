The LocalesStaticService can be used to integrate and define the translations directly in the source code:

The root object must use **language codes** (`de`, `en`, …) as keys. Do not wrap translations in an extra property such as `locales`; otherwise lookups like `examples.newsletter.title` resolve to `en.locales.examples…` and fail.

```typescript
import { LocalesStaticService } from '@ribajs/i18n';

// Your static locales — top-level keys are language codes
const locales = {
  de: {
    examples: {
      newsletter: {
        description_html: 'Abonnieren Sie unseren Newsletter und erhalten Sie <strong>10% Rabatt</strong> auf Ihren nächsten Einkauf.',
        input_value: 'Unbekannt',
        placeholder_last_name: 'Nachname',
        title: 'Melde dich für den Newsletter an',
      },
    },
  },
  en: {
    examples: {
      newsletter: {
        description_html: 'Subscribe to our newsletter and get <strong>10% off</strong> your next purchase.',
        input_value: 'Unknown',
        placeholder_last_name: 'Surname',
        title: 'Sign up for the newsletter',
      },
    },
  },
};

const localesService = new LocalesStaticService(locales);
```
