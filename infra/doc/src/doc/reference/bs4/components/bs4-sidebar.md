A sidebar component as it is also used for this Riba website.

You can use the `bs4-toggle-button` component to open or close the sidebar at any point in the DOM.

#### Attributes

| Name                             | Required | Default |  Description                                                               |
| -------------------------------- |:--------:|:-------:| -------------------------------------------------------------------------- |
| id                               | Yes      |         | The 'id' is required to react to events of the `bs4-toggle-button`, the `target-id` attribute of the `bs4-toggle-button` must be identical to this `id` |
| container-selector               | No       |           | Selector string to get the container element from DOM                      |
| position                         | No       | `"left"`  | The sidebar can be positioned `'right'` or `'left'`                        |
| width                            | No       | `"250px"` | The width of the sidebar with unit (e.g. "px")                             |
| auto-show-on-wider-than          | No       | `1199`    | Auto show the sidebar if the viewport width is wider than this value, pass `-1` to disable auto show       |
| auto-hide-on-slimmer-than        | No       | `1200`    | Auto hide the sidebar if the viewport width is slimmer than this value, pass `-1` to disable auto hide     |
| watch-new-page-ready-event       | No       | `true`    | Watch the routers `newPageReady` event to update the sidebar state, e.g. hide on slime than after route changes |
| force-hide-on-location-pathnames | No       | `[]`      | You can force to hide the sidebar on corresponding URL pathames e.g. you can hide the sidebar on home with `['/']` |
| force-show-on-location-pathnames | No       | `[]`      | Like `force-hide-on-location-pathnames`, but to force to open the sidebar  |
| overlay-on-slimmer-than          | No       | `1200`    | If the viewport width is wider than this value the sidebar adds a margin to the container (detected with the `container-selector`) to reduce its content, if the viewport width is slimmer than this value the sidebar opens over the content |

#### Template methods

| Name                             | Arguments |  Description                                                           |
| -------------------------------- |:---------:| ---------------------------------------------------------------------- |
| hide                             |           | Hides / closes the sidebar                                             |
| show                             |           | Shows / opens the sidebar                                              |
| toggle                           |           | Toggles (closes or opens) the sidebar                                  |

#### Template properties

| Name                             |  Description                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| state                            | The current state of the sidebar, can be `'hidden'`, `'side-left'`, `'side-right'`, `'overlay-left'` or `'overlay-right'` |
| containerSelector                | Passed attribute value, see `container-selector` attribute                                                                |
| position                         | Passed attribute value, see `position` attribute                                                                          |
| width                            | Passed attribute value, see `width` attribute                                                                             |
| autoShowInWiderThan              | Passed attribute value, see `auto-show-on-wider-than` attribute                                                           |
| autoHideOnSlimmerThan            | Passed attribute value, see `auto-hide-on-slimmer-than` attribute                                                         |
| forceHideOnLocationPathnames     | Passed attribute value, see `force-hide-on-location-pathnames` attribute                                                  |
| force-show-on-location-pathnames | Passed attribute value, see `force-show-on-location-pathnames` attribute                                                  |
| overlayOnSlimmerThan             | Passed attribute value, see `overlay-on-slimmer-than` attribute                                                           |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs4-sidebar-component" class="pt-3">
      <template type="single-html-file">
        <div>
          <bs4-sidebar id="example-sidebar" container-selector="#example-sidebar-container" position="right" class="p-3">
            <div rv-show="isActive" rv-on-click="hide" class="d-flex justify-content-center">
              <bs4-icon src="{{ 'iconset_icon_close.svg' | asset_url }}" size="32"></bs4-icon>
            </div>
            <p class="text-center">Hello World!</p>
          </bs4-sidebar>
          <div id="example-sidebar-container">
            <bs4-toggle-button target-id="example-sidebar" class="d-flex justify-content-center">
              <div rv-hide="isActive" rv-on-click="toggle">
                <bs4-icon src="{{ 'iconset_icon_menu.svg' | asset_url }}" size="32"></bs4-icon>
              </div>
              <div rv-show="isActive" rv-on-click="toggle">
                <bs4-icon src="{{ 'iconset_icon_close.svg' | asset_url }}" size="32"></bs4-icon>
              </div>
            </bs4-toggle-button>
            <p class="text-center">Brownie marshmallow powder apple pie bear claw jujubes. Cake sweet roll marzipan. Chocolate cake carrot cake ice cream cake ice cream sesame snaps cake. Jelly-o biscuit jelly beans sweet roll soufflé apple pie. Powder soufflé sugar plum soufflé chocolate bar liquorice oat cake. Halvah powder pudding tart marshmallow. Cake jujubes cookie ice cream danish chupa chups bear claw candy croissant. Caramels fruitcake bonbon bonbon. Fruitcake marshmallow sesame snaps icing oat cake apple pie gummies toffee. Icing bear claw chocolate bar oat cake chocolate dragée apple pie. Jelly-o jelly-o macaroon jujubes lollipop carrot cake lemon drops cake biscuit. Cotton candy muffin gingerbread chupa chups.</p>
          </div>
        </div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
