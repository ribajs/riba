Binds an event listener on the element using the event specified in `[event]` and the bound object (should return a function) as the callback.

*This binder has the same functionality as the binder with the same name from the coreModule, but internally uses the jquery `.on()` and `.off()` event methods*

```html
<button rv-on-click="destroy | args item">Remove</button>
```
