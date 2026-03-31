Checks if value is a number

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-number-formatter">
<template type="single-html-file">
<div rv-text="[] | is-number"></div>
<div rv-text="{} | is-number"></div>
<div rv-text="'abc' | is-number"></div>
<div rv-text="true | is-number"></div>
<div rv-text="1 | is-number"></div>
<div rv-text="0 | is-number"></div>
<div rv-text="undefined | is-number"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
