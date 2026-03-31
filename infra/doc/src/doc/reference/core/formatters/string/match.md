Checks if a string matchs regular expression 

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="match-formatter">
<template type="single-html-file">
<div rv-assign-image="'{{ settings.example_image | img_url: 'master' }}'">
  <img rv-if="image | match '.(gif|jpg|jpeg|tiff|png)'" rv-src="image" class="img-fluid" />
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
