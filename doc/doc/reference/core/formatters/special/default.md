Sets a default value if the first value is not set

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="default-formatter">
<template type="single-html-file">
<div
  rv-assign-empty-string="''"
  rv-assign-filled-string="'Link to the Past'"
  class="text-center"
>
  <div rv-text="emptyString | default 'The Legend of Zelda'"></div>
  <small rv-text="filledString | default 'Placeholder'"></small>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
