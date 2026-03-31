Checks if value is an array

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-array-formatter">
<template type="single-html-file">
<div rv-text="[] | is-array"></div>
<div rv-text="{} | is-array"></div>
<div rv-text="'abc' | is-array"></div>
<div rv-text="true | is-array"></div>
<div rv-text="1 | is-array"></div>
<div rv-text="0 | is-array"></div>
<div rv-text="undefined | is-array"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
