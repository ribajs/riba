Checks if value is a number

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-number-formatter">
<template type="single-html-file">
<div rv-text="[] | isNumber"></div>
<div rv-text="{} | isNumber"></div>
<div rv-text="'abc' | isNumber"></div>
<div rv-text="true | isNumber"></div>
<div rv-text="1 | isNumber"></div>
<div rv-text="0 | isNumber"></div>
<div rv-text="undefined | isNumber"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
