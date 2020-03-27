Checks if value is undefined

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | isUndefined"></div>
<div rv-text="{} | isUndefined"></div>
<div rv-text="'abc' | isUndefined"></div>
<div rv-text="true | isUndefined"></div>
<div rv-text="1 | isUndefined"></div>
<div rv-text="0 | isUndefined"></div>
<div rv-text="undefined | isUndefined"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
