Checks if value is defined

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="is-defined-formatter">
<template type="single-html-file">
<div rv-text="[] | isDefined"></div>
<div rv-text="{} | isDefined"></div>
<div rv-text="'abc' | isDefined"></div>
<div rv-text="true | isDefined"></div>
<div rv-text="1 | isDefined"></div>
<div rv-text="0 | isDefined"></div>
<div rv-text="undefined | isDefined"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
