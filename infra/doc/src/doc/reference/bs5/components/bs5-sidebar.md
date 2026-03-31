A sidebar component as it is also used for this Riba website.

You can use the `bs5-toggle-button` component to open or close the sidebar at any point in the DOM. Use the `rv-bs5-co-[breakpoint]-[attribute]` binder to set different attribute values per viewport breakpoint (e.g. overlap on mobile, side on desktop).

#### Attributes

| Name                             | Required | Default     |  Description                                                               |
| -------------------------------- |:--------:|:-----------:| -------------------------------------------------------------------------- |
| id                               | Yes      |             | The 'id' is required to react to events of the `bs5-toggle-button`, the `target-id` attribute of the `bs5-toggle-button` must be identical to this `id` |
| container-selector               | No       |             | Selector string to get the container element from DOM                      |
| position                         | No       | `"left"`    | The sidebar can be positioned `'right'` or `'left'`                        |
| mode                             | No       | `"overlap"` | Display mode: `'overlap'` (floats over content), `'side'` (pushes content aside), `'move'` (moves entire page) |
| width                            | No       | `"250px"`   | The width of the sidebar with unit (e.g. "px")                             |
| auto-show                        | No       | `false`     | Automatically show the sidebar (use with breakpoint binders for responsive behavior) |
| auto-hide                        | No       | `false`     | Automatically hide the sidebar (use with breakpoint binders for responsive behavior) |
| watch-new-page-ready-event       | No       | `true`      | Watch the router's `newPageReady` event to update the sidebar state after route changes |
| force-hide-on-location-pathnames | No       | `[]`        | Force hide the sidebar on corresponding URL pathnames, e.g. `['/']` for the home page |
| force-show-on-location-pathnames | No       | `[]`        | Like `force-hide-on-location-pathnames`, but to force the sidebar open     |
| close-on-swipe                   | No       | `true`      | Close sidebar when user swipes (overlap mode only)                         |
| prevent-scrolling-on-overlap     | No       | `true`      | Prevent body scrolling when sidebar overlaps content                       |

#### Responsive Attributes

Use `rv-bs5-co-[breakpoint]-[attribute]` binders to set different values per viewport breakpoint:

```html
<bs5-sidebar id="main-sidebar"
  rv-bs5-co-xs-auto-hide="true"
  rv-bs5-co-xl-auto-hide="false"
  rv-bs5-co-xs-auto-show="false"
  rv-bs5-co-xl-auto-show="true"
  rv-bs5-co-xs-mode="'overlap'"
  rv-bs5-co-xl-mode="'side'"
>
```

Available breakpoints: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

#### Template methods

| Name                             | Arguments |  Description                                                           |
| -------------------------------- |:---------:| ---------------------------------------------------------------------- |
| hide                             |           | Hides / closes the sidebar                                             |
| show                             |           | Shows / opens the sidebar                                              |
| toggle                           |           | Toggles (closes or opens) the sidebar                                  |

#### Template properties

| Name                             |  Description                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| state                            | The current state of the sidebar, can be `'hidden'`, `'side-left'`, `'side-right'`, `'overlap-left'`, `'overlap-right'`, `'move-left'` or `'move-right'` |
| containerSelector                | Passed attribute value, see `container-selector` attribute                                                                |
| position                         | Passed attribute value, see `position` attribute                                                                          |
| mode                             | Passed attribute value, see `mode` attribute                                                                              |
| width                            | Passed attribute value, see `width` attribute                                                                             |
| autoShow                         | Passed attribute value, see `auto-show` attribute                                                                         |
| autoHide                         | Passed attribute value, see `auto-hide` attribute                                                                         |
| forceHideOnLocationPathnames     | Passed attribute value, see `force-hide-on-location-pathnames` attribute                                                  |
| forceShowOnLocationPathnames     | Passed attribute value, see `force-show-on-location-pathnames` attribute                                                  |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs5-sidebar-component" class="pt-3">
      <template type="single-html-file">
        <div>
          <bs5-sidebar id="example-sidebar" container-selector="#example-sidebar-container" position="right" class="p-3">
            <div rv-show="isActive" rv-on-click="hide" class="d-flex justify-content-center">
              <bs5-icon src="/iconset/icon_close.svg" size="32"></bs5-icon>
            </div>
            <p class="text-center">Hello World!</p>
          </bs5-sidebar>
          <div id="example-sidebar-container">
            <bs5-toggle-button target-id="example-sidebar" class="d-flex justify-content-center">
              <div rv-hide="isActive" rv-on-click="toggle">
                <bs5-icon src="/iconset/icon_menu.svg" size="32"></bs5-icon>
              </div>
              <div rv-show="isActive" rv-on-click="toggle">
                <bs5-icon src="/iconset/icon_close.svg" size="32"></bs5-icon>
              </div>
            </bs5-toggle-button>
            <p class="text-center">Brownie marshmallow powder apple pie bear claw jujubes. Cake sweet roll marzipan. Chocolate cake carrot cake ice cream cake ice cream sesame snaps cake. Jelly-o biscuit jelly beans sweet roll soufflé apple pie. Powder soufflé sugar plum soufflé chocolate bar liquorice oat cake. Halvah powder pudding tart marshmallow. Cake jujubes cookie ice cream danish chupa chups bear claw candy croissant. Caramels fruitcake bonbon bonbon. Fruitcake marshmallow sesame snaps icing oat cake apple pie gummies toffee. Icing bear claw chocolate bar oat cake chocolate dragée apple pie. Jelly-o jelly-o macaroon jujubes lollipop carrot cake lemon drops cake biscuit. Cotton candy muffin gingerbread chupa chups.</p>
          </div>
        </div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
