Checks if value is undefined

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | is-undefined"></div>
<div rv-text="{} | is-undefined"></div>
<div rv-text="'abc' | is-undefined"></div>
<div rv-text="true | is-undefined"></div>
<div rv-text="1 | is-undefined"></div>
<div rv-text="0 | is-undefined"></div>
<div rv-text="undefined | is-undefined"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
