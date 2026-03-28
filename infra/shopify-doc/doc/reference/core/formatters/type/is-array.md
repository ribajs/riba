Checks if value is an array

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-array-formatter">
<template type="single-html-file">
<div rv-text="[] | isArray"></div>
<div rv-text="{} | isArray"></div>
<div rv-text="'abc' | isArray"></div>
<div rv-text="true | isArray"></div>
<div rv-text="1 | isArray"></div>
<div rv-text="0 | isArray"></div>
<div rv-text="undefined | isArray"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
