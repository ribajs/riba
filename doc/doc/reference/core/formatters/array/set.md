Sets property of object, array or value

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div
  rv-assign-arr="['cracker', 'muffin', 'broccoli'] | set 2 'cake'"
  rv-assign-obj="{'cracker': 'tasty', 'muffin': 'yummy', 'cake': 'disgusting'} | set 'cake' 'the tastiest'"
>
  <span rv-text="arr | get 2"></span> is <span rv-text="obj.cake"></span>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
