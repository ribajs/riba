Formatter to check if value is lower than another value.
This formatter corresponds to the `<` operator: ` a < b`.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-if="19 | lt 20">Show me!</div>
<div rv-if="20 | lt 20">Show me not!</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
