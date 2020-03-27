Loads an shopify image with the exact size for the current `img` element without the need to get the right size manually over the `img_url` filter / formatter. The image source path is set by the `srcset` and `sizes` attributes to make them responsive.

*You should prefer to set the `srcset` attribute server-site (with liquid) (but if you want to use the `shopify-img` binder anyway the `src` attribute should not be set server-site, as this causes problems for some browsers if the srcset attribute is set afterwards the `src` attribute) but if your images are generated anyway with riba e.g. within a `rv-each-item` binder then you can safely use the `shopify-img` binder.*

<rv-bind-content class="pt-3"><template>
<rv-example-tabs handle="shopify-img">
<template type="single-html-file">
<img
  rv-shopify-img="'{{ settings.example_image | img_url: 'master' }}'"
  lazyload="lazy"
  class="img-fluid w-100"
  alt="{{ settings.example_image.alt }}"
/>
</template>
</rv-example-tabs>
</template></rv-bind-content>
