Formatter to check if the first value is `true` or the second value is true.
This formatter corresponds to the `||` expression: `a || b`.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-if="false | or true">Show me!</div>
<div rv-if="true | or false">Show me, too!</div>
<div rv-if="false | or false">Show me not!</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
