Returns true if value index is the last index of the array and returns false if it is not the last index

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="example">
<template type="single-html-file">
<ul rv-assign-sweets="['cracker', 'muffin', 'cake']">
  <li rv-each-sweetness="sweets" rv-class-font-weight-bold="sweets | is-last %sweetness%">{sweetness}</li>
</ul>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
