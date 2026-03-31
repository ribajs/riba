Adapters are defined on `riba.adapters` with the interface as the property name and the adapter object as the value. An adapter is just an object that responds to `observe`, `unobserve`, `get` and `set`.

For most projects, the built-in `.` adapter is enough. Create a custom adapter
only if your model API requires custom observe/get/set behavior.

The following `:` adapter is an example for event-driven model APIs (such as
Backbone.js models / Stapes.js modules).

```javascript
riba.adapters[':'] = {
  observe: function(obj, keypath, callback) {
    obj.on('change:' + keypath, callback)
  },
  unobserve: function(obj, keypath, callback) {
    obj.off('change:' + keypath, callback)
  },
  get: function(obj, keypath) {
    return obj.get(keypath)
  },
  set: function(obj, keypath, value) {
    obj.set(keypath, value)
  }
}
```
