Events are emitted on the **`LocalesService` instance** you pass to `i18nModule.init({ localesService })`, via `localesService.event` (an `EventDispatcher` with namespace `'i18n'`). You can subscribe with the same namespace:

```typescript
import { EventDispatcher } from "@ribajs/events";

const event = new EventDispatcher("i18n");
event.on("changed", (langcode: string, initial: boolean) => {
  console.debug("The language was changed", langcode, initial);
});
event.on("ready", (currentLangcode: string, translationNeeded: boolean) => {
  console.debug(
    "Locales are initialized; module is ready",
    currentLangcode,
    translationNeeded,
  );
});
```

Alternatively, use `localesService.event.on(...)` on your registered service (same dispatcher instance as `new EventDispatcher('i18n')`).

| Name    | Arguments                              | Description                                                                 |
| ------- | -------------------------------------- | --------------------------------------------------------------------------- |
| changed | `langcode`, `initial`                  | The active language was changed.                                            |
| ready   | `currentLangcode`, `translationNeeded` | Locales finished loading and initialization; safe to translate.             |
