Component to collapse the Bootstrap 4 navbar.

#### Attributes

| Name                             | Required | Default             |  Description                                                           |
| -------------------------------- |:--------:|:-------------------:| ---------------------------------------------------------------------- |
| `collapse-selector`              | No       | `'.navbar-collapse'`| The selector of the collabseable child element                         |
| `animated`                       | No       | `true`              | Set the attribute to `animated="false"` to disable collapse animations |

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
    <rv-example-tabs handle="bs4-navbar" class="pt-3">
      <template type="single-html-file">
        <bs4-navbar class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Navbar</a>
          <div class="navbar-toggler" rv-show="isCollapsed" rv-on-click="toggle">
            <bs4-icon src="{{ 'iconset_icon_menu.svg' | asset_url }}" size="32"></bs4-icon>
          </div>
          <div class="navbar-toggler" rv-hide="isCollapsed" rv-on-click="toggle">
            <bs4-icon src="{{ 'iconset_icon_close.svg' | asset_url }}" size="32"></bs4-icon>
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
        </bs4-navbar>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
