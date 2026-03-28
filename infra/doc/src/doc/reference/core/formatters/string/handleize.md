Formats a string into a handle, useful to use a title string as an id or class attribute

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="handleize-formatter">
<template type="single-html-file">
<div rv-assign-title="'Handleize Example Title'">
  <h2 class="m-0" rv-id="title | handleize" rv-text="title"></h2>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
