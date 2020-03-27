Assign a value in your model, sets or overwrites a value by his property name (named whatever value is in place of `[property]`) in your model.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-icon">
      <template type="single-html-file">
        <div rv-assign-new-value="'Hello World'">{newValue}!</div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
