Formatter to check if a value is between two values.
This formatter corresponds to the expression: `a >= b && a <= c`.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-if="100 | between 50 200">Show me!</div>
<div rv-if="201 | between 50 200">Show me not!</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
