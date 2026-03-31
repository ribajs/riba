Components let you define reusable views that can be used within any of your templates. For some perspective on where components fit into your templates in relation to binders; binders define custom attributes, while components define custom elements.

### Based on Custom Elements

Unlike [Rivets.js components](https://rivetsjs.com/docs/guide/#components), components in Riba.js follow the [Custom Elements specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

#### Browser support

Riba components require native `customElements` support and are intended for modern evergreen browsers.
Legacy-browser fallback implementations are not part of the maintained first-party runtime anymore.

### Create a New Component

You can generate a new formatter with the Riba CLI.

```bash
riba generate component todo-item
```

This will create a new directory with a new component (and a `.spec.ts` file for tests) in your `./src/ts/component` directory and updates your `./src/ts/components/index.ts` file.

A component class typically defines `observedAttributes`, a `scope`, and a `template` function, which returns the template for the component (this can be an HTML string or the actual element). The component is initialized in lifecycle callbacks (for example via `connectedCallback` and `init(...)`).

```typescript
import { Component } from '@ribajs/core';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';

interface Scope {
  description?: string;
}

export class TodoItemComponent extends Component {
  public static tagName = 'rv-todo-item';
  protected autobind = true;

  static get observedAttributes() {
    return ['description'];
  }

  public scope: Scope = {
    description: undefined,
  };

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TodoItemComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected async template() {
    if (this.el && hasChildNodesTrim(this.el)) {
      return null;
    } else {
      const { default: template } = await import('./todo-item.component.html?raw');
      return template;
    }
  }
}
```

To use the component inside of a template, simply use an element with the same tag name as the component's `tagName`. Unlike on binders, the attributes on the element will not evaluated as keypaths, the reason for this is that custom elements are internally registered with the native browser `customElements.define('rv-todo-item', TodoItemComponent);` method and no external values can be passed over it.

```html
<rv-todo-item description="Buy cat food"></rv-todo-item>
```
