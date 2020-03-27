Tests the url with the current location, if the current location starts with the url this element gets the `[classname]` class

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="parent-route-class-classname">
      <template type="single-html-file">
        <a href="/pages/router" class="nav-link" rv-parent-route-class-active="'/pages'">Router</a>
        <a href="/pages/core" class="nav-link" rv-parent-route-class-active="'/pages'">Core</a>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
