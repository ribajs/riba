Assign a value in your model. The value you want to assign must be an object and will be concatenate with your model. You can also pass a JSON string.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="assing-binder">
      <template type="single-html-file">
        <div rv-assign="{'newValue': 'hello', 'anotherNewValue': 'world'}">{newValue} {anotherNewValue}!</div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
