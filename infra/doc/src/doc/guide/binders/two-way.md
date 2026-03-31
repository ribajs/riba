Two-way binders, like one-way binders, can update the DOM when a model property changes (model-to-view) but can also update the model when the user interacts with the DOM (view-to-model), such as updating a control input, clicking an element or interacting with a third-party widget.

In order to update the model when the user interacts with the DOM, you need to tell Riba.js how to bind and unbind to that DOM element to set the value on the model. Instead of defining the binder with a single `routine` function, two-way binders are defined as an object containing a few extra functions.

```typescript
import { Binder } from '@ribajs/core';

export class ToggleBinder extends Binder<boolean, HTMLElement> {
  static key = 'toggle';
  private clickHandler?: () => void;

  bind(el: HTMLElement) {
    const adapter = this.config.adapters[this.key.interface];
    this.clickHandler = () => {
      const value = adapter.read(this.model, this.keypath);
      adapter.publish(this.model, this.keypath, !value);
    };
    el.addEventListener('click', this.clickHandler);
  }

  unbind(el: HTMLElement) {
    if (this.clickHandler) {
      el.removeEventListener('click', this.clickHandler);
    }
  }

  routine(el: HTMLElement, value: boolean) {
    el.classList.toggle('enabled', value);
  }
}
```

