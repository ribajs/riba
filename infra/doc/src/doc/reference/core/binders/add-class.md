Adds the value of the attribute to the class. Instead of `class-[classname]` the classname is setted by the attribute value and not by the star value.

```html
<ul>
  <li rv-each-todo="todos">
    <div rv-add-class="todo.state"></div>
  </li>
<ul>
 ```
