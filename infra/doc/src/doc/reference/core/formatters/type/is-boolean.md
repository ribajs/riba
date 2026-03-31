Checks if value is a boolean

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | is-boolean"></div>
<div rv-text="{} | is-boolean"></div>
<div rv-text="'abc' | is-boolean"></div>
<div rv-text="true | is-boolean"></div>
<div rv-text="1 | is-boolean"></div>
<div rv-text="0 | is-boolean"></div>
<div rv-text="undefined | is-boolean"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
