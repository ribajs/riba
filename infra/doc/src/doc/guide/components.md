Components let you define reusable views that can be used within any of your templates. For some perspective on where components fit into your templates in relation to binders; binders define custom attributes, while components define custom elements.

### Based on Custom Elements

Unlike [Rivets.js components](http://rivetsjs.com/docs/guide/#components) in Riba.js components following the [custom elements specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

#### Backward Compatible

The components in Riba are having a additional small fallback implementation which makes it work also on browser that does not support custom elements. The fallback implementation has the advantage, that no large polyfills are needed.

Usually, custom elements require the ES2015 class syntax but in Riba.js we found a way that custom elements also working with the prototype class syntax. Therefore you can convert your Riba project (e.g. with Babel) also for old browsers and your custom elements are still working with modern browsers.

### Create a New Component

You can generate a new formatter with the Riba CLI.

```bash
riba generate component todo-item
```

This will create a new directory with a new component (and a `.spec.ts` file for tests) in your `./src/ts/component` directory and updates your `./src/ts/components/index.ts` file.

A component object must define a `template` function, which returns the template for the component (this can be an HTML string or the actual element). It must also define an `initialize` function, which returns the scope object to bind the view with (this will likely be a controller / viewmodel / presenter).

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
