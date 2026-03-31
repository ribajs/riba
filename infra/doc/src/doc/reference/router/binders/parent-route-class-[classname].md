Tests the url with the current location, if the current location starts with the url this element gets the `[classname]` class

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="parent-route-class-classname">
      <template type="single-html-file">
        <a href="router.html" class="nav-link" rv-parent-route-class-active="'/router'">Router</a>
        <a href="iconset.html" class="nav-link" rv-parent-route-class-active="'/iconset'">Iconset</a>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
