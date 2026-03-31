Calls a function with arguments

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="args-formatter">
<template type="single-html-file">
<div rv-assign-result="0">
  Result is {sum | call 5 8}.
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
