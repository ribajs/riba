Formatters can accept any number of arguments in the form of keypaths or primitives. Keypath arguments get observed and will recompute the binding when any intermediary key changes. A primitive can be a string, number, boolean, null or undefined.

```html
<span>{ alarm.time | time user.timezone 'hh:mm' }</span>
```

The value of each argument in the binding declaration will be evaluated and passed into the formatter function as an additional argument.

```typescript
import { Formatter } from '@ribajs/core';

export const TimeFormatter: Formatter = {
  name: 'time',
  read(value: Date, timezone: string, format: string) {
    return moment(value).tz(timezone).format(format)
  }
};
```
