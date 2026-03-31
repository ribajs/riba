Checks if value is a string

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-number-formatter">
<template type="single-html-file">
<div rv-text="[] | is-string"></div>
<div rv-text="{} | is-string"></div>
<div rv-text="'abc' | is-string"></div>
<div rv-text="true | is-string"></div>
<div rv-text="1 | is-string"></div>
<div rv-text="0 | is-string"></div>
<div rv-text="undefined | is-string"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
