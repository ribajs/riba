The abstract class **`LocalesService`** (`packages/i18n/src/types/locales-service.ts`) is the base for all locale backends. Implementations included in `@ribajs/i18n`:

| Class                 | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `LocalesStaticService`  | In-memory object (`de` / `en` / … as keys) |
| `LocalesRestService`    | Load JSON from a URL via `HttpService`      |

To implement your own backend, extend `LocalesService` and implement `protected async getAll(): Promise<any>` so it returns the same shape as the static service (top-level keys = language codes). Call `super(doNotRetranslateDefaultLanguage, showMissingTranslation, autoDetectLangcode)` with the three boolean flags expected by the base constructor, then invoke the initialization flow (see `LocalesStaticService` / `LocalesRestService` in the source tree for full patterns).

The former name **ALocalesService** is outdated; the exported abstract type is **`LocalesService`**.
