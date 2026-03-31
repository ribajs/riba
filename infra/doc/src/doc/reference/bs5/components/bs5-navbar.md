Component to collapse the Bootstrap 5 navbar.

#### Attributes

| Name                             | Required | Default             |  Description                                                           |
| -------------------------------- |:--------:|:-------------------:| ---------------------------------------------------------------------- |
| `collapse-selector`              | No       | `'.navbar-collapse'`| The selector of the collapsible child element                          |

#### Template methods

| Name                             | Arguments |  Description                                                           |
| -------------------------------- |:---------:| ---------------------------------------------------------------------- |
| hide                             |           | Hides / closes / collapses the navbar collabseable child element       |
| show                             |           | Shows / opens / expands the navbar collabseable child element          |
| toggle                           |           | Toggles (closes or opens) the navbar collabseable child element        |

#### Template properties

| Name                             |  Description                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------- |
| isCollapsed                      | `true` if navbar collabseable child element is collapsed, otherwise `false`   |
| collapseSelector                 | See `collapse-selector` attribute                                             |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs5-navbar" class="pt-3">
      <template type="single-html-file">
        <bs5-navbar class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Navbar</a>
          <div class="navbar-toggler" rv-show="isCollapsed" rv-on-click="toggle">
            <bs5-icon src="/iconset/icon_menu.svg" size="32"></bs5-icon>
          </div>
          <div class="navbar-toggler" rv-hide="isCollapsed" rv-on-click="toggle">
            <bs5-icon src="/iconset/icon_close.svg" size="32"></bs5-icon>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </bs5-navbar>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
