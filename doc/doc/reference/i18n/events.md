To subscribe events from the i18n module create a new instance of the `EventDispatcher` with `'i18n'` as his namespace:

```typescript
import { EventDispatcher } from '@ribajs/core';
const event = new EventDispatcher('i18n');
event.on('changed', () => {
  console.debug('The language was changed');
});
event.on('ready', () => {
  console.debug('All locales are loaded and initialized and the module is ready to use');
});
```

| Name                | Arguments                             | Description                                                                              |
| ------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| changed             | `langcode`, `initial`                 | The language was changed                                                                 |
| ready               | `currentLangcode`, `translationNeeded`| All locales are loaded and initialized and the module is ready to use.                   |
