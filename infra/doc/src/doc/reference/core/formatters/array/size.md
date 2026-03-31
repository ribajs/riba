Returns the size of a string (the number of characters) or an array (the number of elements)

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="size-formatter">
<template type="single-html-file">
<div
  rv-assign-str="'This string has a length of'"
  rv-assign-arr="['cracker', 'muffin', 'cake']"
>
  {str} {str | size} characters and the array has a length of {arr | size} elements.
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
