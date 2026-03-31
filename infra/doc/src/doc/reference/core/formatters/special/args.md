This special formatter sets his arguments to a function without call them directly

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="args-formatter">
<template type="single-html-file">
<div rv-assign-result="0">
  <button rv-on-click="sum | args 5 8">Result is {result}.</button>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
