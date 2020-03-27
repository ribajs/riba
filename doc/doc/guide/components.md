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

This will create a new directory with a new component (and a `.spec.ts` file for tests) in your `./src/component` directory and updates your `./src/components/index.ts` file.

A component object must define a `template` function, which returns the template for the component (this can be an HTML string or the actual element). It must also define an `initialize` function, which returns the scope object to bind the view with (this will likely be a controller / viewmodel / presenter).

```javascript
import {
  Component,
  Debug,
} from '@ribajs/core';

import template from './todo-item.component.html';

interface Scope {
  description?: string;
}

export class TodoItemComponent extends Component {

  public static tagName: string = 'rv-todo-item';

  protected autobind = true;

  static get observedAttributes() {
    return ['description'];
  }

  protected scope: Scope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(TodoItemComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
```

To use the component inside of a template, simply use an element with the same tag name as the component's `tagName`. Unlike on binders, the attributes on the element will not evaluated as keypaths, the reason for this is that custom elements are internally regists with the native browser `customElements.define('rv-todo-item', TodoItemComponent);` method and no external values can be passed over it.

```html
<rv-todo-item description="Buy cat food"></rv-todo-item>
```
