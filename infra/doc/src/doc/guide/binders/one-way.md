One-way binders simply update the DOM when a model property changes (model-to-view only). Let's say we want a simple binder that updates an element's color when the model property changes. Here we can define a one-way `color` binder as a object with only a `routine` function. This function takes the element and the current value of the model property, which we will use to updates the element's color.

You can generate a new binder with the Riba CLI.

```bash
riba generate binder color
```

This will generate the binder (and a `.spec.ts` file) in your `./src/binders` directory and updates your `./src/binders/index.ts` file.

Than you can change the implementation like this:

```typescript
import { Binder } from '@ribajs/core';

export const ColorBinder: BinderDeprecated<string> = {
  name: 'color',
  routine(el: HTMLElement, value: string) {
    el.style.color = value;
  },
};
```

If you use Riba CLI to generate the binder, you usually do not need to register the binder yourself because the CLI updates the `./src/binders/index.ts` for you. 

Alternatively, you can register the binder by calling `riba.module.binder.regist` with your new binder.

```typescript
import { Riba } from '@ribajs/core';
import { ColorBinder } from './binders/color.binder';

const riba = new Riba();
riba.module.binder.register(ColorBinder);
```

With the above binder defined, you can now utilize the `rv-color` declaration in your views.

```html
<button rv-color="label.color">Apply</button>
```
