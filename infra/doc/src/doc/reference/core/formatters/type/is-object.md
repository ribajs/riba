Checks if value is a object

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | is-object"></div>
<div rv-text="{} | is-object"></div>
<div rv-text="'abc' | is-object"></div>
<div rv-text="true | is-object"></div>
<div rv-text="1 | is-object"></div>
<div rv-text="0 | is-object"></div>
<div rv-text="undefined | is-object"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
