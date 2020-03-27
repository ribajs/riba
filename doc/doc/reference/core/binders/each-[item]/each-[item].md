Appends a new instance of the element in place for each item in an array. Each element is bound to a new view created in a scope with three special properties:
  * the current iterated item in the array, named whatever value is in place of `[item]`
  * `%[item]%`: the current iterated item index. Can be configured by setting `index-property` attribute
  * `$parent`: the parent scope, if any

*Also note that you may bind to the iterated item directly on the parent element which contains the actual `rv-each` declaration.*

```html
<ul>
  <li rv-each-todo="todos" rv-data-id="todo.id">
    <input type="checkbox" rv-checked="todo.done"> { %todo% } - { todo.name }
  </li>
<ul>
```
