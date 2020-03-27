The `ALocalesService` is a abstract class extended from all locales services, a static LocalesService could look like this:

```typescript
import { ALocalesService } from '@ribajs/i18n';

export class MyStaticLocalesService extends ALocalesService {

  public static instances: {
    [id: string]: MyStaticLocalesService;
  } = {};

  public static getInstance(id: string = 'main') {
    return MyStaticLocalesService.instances[id];
  }

  /**
   * The current setted langcode
   */
  protected currentLangcode?: string;

  /**
   * The default theme langcode before any language was choosed
   */
  protected initalLangcode?: string;

  constructor(staticLocales: any, protected id?: string, doNotTranslateDefaultLanguage: boolean = false, showMissingTranslation: boolean = false) {
    super(doNotTranslateDefaultLanguage, showMissingTranslation);
    if (!id) {
      id = 'main';
    }

    // Sets the static translations
    this.locales = staticLocales;

    // Return the singleton if available
    if (MyStaticLocalesService.instances[id]) {
      return MyStaticLocalesService.instances[id];
    }

    this.init();
    MyStaticLocalesService.instances[id] = this;
  }

  /**
   * Get object with all translations
   * @param themeID
   */
  protected async getAll(themeID?: number) {
    return this.locales;
  }
}
```
