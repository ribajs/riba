Checks if value is a string

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-number-formatter">
<template type="single-html-file">
<div rv-text="[] | isString"></div>
<div rv-text="{} | isString"></div>
<div rv-text="'abc' | isString"></div>
<div rv-text="true | isString"></div>
<div rv-text="1 | isString"></div>
<div rv-text="0 | isString"></div>
<div rv-text="undefined | isString"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
