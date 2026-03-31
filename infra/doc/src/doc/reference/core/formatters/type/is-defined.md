Checks if value is defined

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-defined-formatter">
<template type="single-html-file">
<div rv-text="[] | is-defined"></div>
<div rv-text="{} | is-defined"></div>
<div rv-text="'abc' | is-defined"></div>
<div rv-text="true | is-defined"></div>
<div rv-text="1 | is-defined"></div>
<div rv-text="0 | is-defined"></div>
<div rv-text="undefined | is-defined"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
