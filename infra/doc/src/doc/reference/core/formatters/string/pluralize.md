Gets the singular or plural version of a string based on the value of a number. The first parameter is the singular string and the second parameter is the plural string

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="pluralize-formatter">
<template type="single-html-file">
<div
  rv-assign-items="['Raspberry Pi', 'Arduino']"
  rv-assign-colors="['Blue']"
>
  Your cart has {items | size} {items | size | pluralize 'item' 'items'} with {colors | size}  {colors | size | pluralize 'color' 'colors'}
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
