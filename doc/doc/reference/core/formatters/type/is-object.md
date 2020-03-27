Checks if value is a object

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | isObject"></div>
<div rv-text="{} | isObject"></div>
<div rv-text="'abc' | isObject"></div>
<div rv-text="true | isObject"></div>
<div rv-text="1 | isObject"></div>
<div rv-text="0 | isObject"></div>
<div rv-text="undefined | isObject"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
