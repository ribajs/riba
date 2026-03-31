Tests the url with the current location, if the url is equal to the current location this element gets the class

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="route-class-classname">
      <template type="single-html-file">
        <a href="router.html" class="nav-link" rv-route-class-active="'router.html'">Router</a>
        <a href="core.html" class="nav-link" rv-route-class-active="'core.html'">Core</a>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
