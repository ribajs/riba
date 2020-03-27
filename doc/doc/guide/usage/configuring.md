Use `riba.configure` to set the following configuration options for your app. Note that all configuration options can be overridden locally to a particular view if needed.

```typescript
riba.configure({

  // Attribute prefix in templates
  prefix: 'rv',

  // Preload templates with initial data on bind
  preloadData: true,

  // Root sightglass interface for keypaths
  rootInterface: '.',

  // Template delimiters for text bindings
  templateDelimiters: ['{', '}'],

  // Removes binder attribute after the binder was bound
  removeBinderAttributes: true,

  // Stop binding on this node names
  blockNodeNames: ['SCRIPT', 'STYLE', 'TEMPLATE', 'CODE'],

  // Augment the event handler of the on-* binder
  handler: function(target, event, binding) {
    this.call(target, event, binding.view.models)
  }

})
```
