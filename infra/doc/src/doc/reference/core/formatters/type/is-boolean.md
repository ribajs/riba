Checks if value is a boolean

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-boolean-formatter">
<template type="single-html-file">
<div rv-text="[] | isBoolean"></div>
<div rv-text="{} | isBoolean"></div>
<div rv-text="'abc' | isBoolean"></div>
<div rv-text="true | isBoolean"></div>
<div rv-text="1 | isBoolean"></div>
<div rv-text="0 | isBoolean"></div>
<div rv-text="undefined | isBoolean"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
