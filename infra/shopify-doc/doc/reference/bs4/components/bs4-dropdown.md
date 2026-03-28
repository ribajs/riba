Instead of adding `data-toggle="dropdown"` to your html element (as it is with the original bootstrap 4) you need to set the wrapper element tag name to `<bs4-dropdown class="dropup">...</bs4-dropdown>` and add the attribute `rv-on-click="toggle"` to the element which should trigger the toggle.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-dropdown">
      <template type="single-html-file">
        <bs4-dropdown class="dropdown">
          <a rv-on-click="toggle" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>
        </bs4-dropdown>
        <bs4-dropdown class="dropup">
          <a rv-on-click="toggle" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropupMenuLink" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="dropupMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>
        </bs4-dropdown>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>


