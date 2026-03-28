Check if value is a string and not empty

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="filled-formatter">
<template type="single-html-file">
<div
  rv-assign-empty-string="''"
  rv-assign-filled-string="'Link to the Past'"
  class="text-center"
>
  <div rv-if="emptyString | filled" rv-text="emptyString"></div>
  <div rv-if="filledString | filled" rv-text="filledString"></div>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
