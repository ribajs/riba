Sets the element's HTML content like `rv-html`, but also binds the HTML content so you can also use binders and componentes in such html templates.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="assing-binder">
      <template type="single-html-file">
        <div rv-assign-tpl="'<li rv-each-item='items'>{item}</li>'" rv-assign-items="['a', 'b', 'c', 'd']">
          <ul rv-template="tpl"></ul>
        </div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
