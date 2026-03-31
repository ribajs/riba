Returns `true` if a string or array is empty

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="empty-formatter">
<template type="single-html-file">
<div rv-if="[] | empty" >The array is empty</div>
<div rv-if="['cracker'] | empty" >The array is not empty</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
