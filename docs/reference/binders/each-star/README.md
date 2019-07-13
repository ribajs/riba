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

<iframe src="https://codesandbox.io/embed/github/ribajs/riba/tree/master/docs/reference/binders/each-star?fontsize=14" title="each-star-example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Nested `rv-each`
By nesting elements bound by `rv-each`, a scope is created for each nest level. The variables from parent scopes can be acessed by child ones, using a resolution algorithm similar to JavaScript prototype chain, i.e., looks for current scope if not found, look in parent scope repeating until find.

```html
<ul>
  <li rv-each-category="categories">
    { category.name }
    <ul>
      <li rv-each-todo="category.todos">
        <input
          type="checkbox"
          rv-checked="todo.done"
          rv-data-category-id="category.id">
          { %category% } - { %todo% } - { todo.name }
      </li>
    <ul>
  </li>
<ul>
```

A more complex example can be found [here](https://codepen.io/blikblum/pen/MKXXOX?editors=1010#0)