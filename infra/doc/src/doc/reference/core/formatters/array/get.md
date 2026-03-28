Get property of object or array by key or index

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="get-formatter">
<template type="single-html-file">
I like <span rv-text="['cracker', 'muffin', 'cake'] | get 1" ></span>.
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
