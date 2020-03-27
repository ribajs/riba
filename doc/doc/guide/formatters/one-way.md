This is by far the most common and practical way to use formatters &mdash; simple read-only mutations to a value. Taking the dates example from above, we can define a `date` formatter that returns a human-friendly version of a date value.

You can generate a new formatter with the Riba CLI.

```bash
riba generate formatter date
```

This will generate the formatter (and a `.spec.ts` file for tests) in your `./src/formatters` directory and updates your `./src/formatters/index.ts` file.

Than you can change the implementation like this:

```typescript
import { Formatter } from '@ribajs/core';

export const dateFormatter: Formatter = {
  name: 'date',
  read(value: Date) {
    return moment(value).format('MMM DD, YYYY')
  },
};
```

If you use Riba CLI to generate the formatter, you usually do not need to register the formatter yourself because the CLI updates the `./src/formatters/index.ts` for you. 

Alternatively, you can register the formatter by calling `riba.module.binder.regist` with your new formatter.

```typescript
import { Riba } from '@ribajs/core';
import { colorBinder } from './formatters/date.formatter';

const riba = new Riba();
riba.module.formatter.regist(dateFormatter);
```


*You can also register multiple formatters at once by calling `riba.module.binder.regists`, this is useful when importing multiple formatters like `import * as formatters from './formatters';`*

After you have regist your formatter, formatters are applied by piping them to binding declarations using `|` as a delimiter.

```html
<span rv-text="event.startDate | date"></span>
```
