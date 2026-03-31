This most method here are part of the official custom elements specification. Read more about this methods [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks).

### connectedCallback

Invoked when the custom element is first connected to the document's DOM.

### disconnectedCallback

Invoked each time the custom element is disconnected from the document's DOM.

### adoptedCallback

Invoked when one of the custom element's attributes is added, removed, or changed.

### attributeChangedCallback

Invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice change for is specified in a static get `observedAttributes` method.

If you override this method you should always call the super method:

```typescript
protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
  super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  // Do here what ever you want
}
```

The super method will automatically assign the attribute value to your model / scope, e.g. `<my-custom-element option-width="500"></my-custom-element>` will automatically assign the attribute value to your model / scope `this.scope.optionWidth = 500;`, the attribute name is converted into camelCase.

### parsedAttributeChangedCallback

Invoked after `attributeChangedCallback` was invoked, this callback method has the same parameters like `attributeChangedCallback` with the only difference that the attribute name was converted to camelCase. E.g. `option-width` would be converted to `optionWidth`.
