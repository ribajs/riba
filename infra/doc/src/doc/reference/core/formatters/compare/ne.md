Formatter to check if value is **not** equal than another value.
This formatter corresponds to the `!==` operator: ` a !== b`.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-if="10 | ne 20">Show me!</div>
<div rv-if="20 | ne 20">Show me not!</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
