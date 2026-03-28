Formatter to check if value is **not** `true`.
This formatter corresponds to the `!` expression: `!a`.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-if="false | not">Show me!</div>
<div rv-unless="true | not">Show me, too!</div>
<div rv-if="true | not">Show me not!</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
