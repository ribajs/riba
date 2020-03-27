Blocks the binding for the current element and his childs.

*Please note that `script`, `style`, `template` and `code` tags are blocked by default. You can change this by setting the `blockNodeNames` option.*

```html
<div rv-block="">
  <!--
    After binding you will see `{ value }`
    (instead of the content of value)
    because the binding is blocked here
  -->
  { value }
</div>
 ```
