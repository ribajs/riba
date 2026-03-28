The LocalesRestService can be used to get the translation json object with a REST API call:

```typescript
import { LocalesRestService } from '@ribajs/i18n';

const url = 'https://localhost/api/locales'

const localesService = new LocalesRestService(url);
```
