Sets an url with size to the `srcset` attribute

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs handle="srcset-size" class="pt-3">
<template type="single-html-file">
<img
  rv-srcset-468w="'//placehold.it/468x'"
  rv-srcset-648w="'//placehold.it/648x'"
  rv-srcset-1068w="'//placehold.it/1068x'"
  sizes="(max-width: 767px) 468px, (max-width: 991px) 648px, (min-width: 992px) 1068px"
  class="img-fluid"
  src="//placehold.it/100x"
/>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
