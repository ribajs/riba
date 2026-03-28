Tests the url with the current location, if the url is equal to the current location this element gets the class

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="route-class-classname">
      <template type="single-html-file">
        <a href="/pages/router" class="nav-link" rv-route-class-active="'/pages/router'">Router</a>
        <a href="/pages/core" class="nav-link" rv-route-class-active="'/pages/core'">Core</a>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
