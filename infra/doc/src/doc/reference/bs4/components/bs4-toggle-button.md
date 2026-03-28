This components is used to trigger a toggle event used in other components or parts of your project.
This site itself uses the `bs4-toggle-button` to open or close the sidebar.

#### Attributes

| Name                   | Required | Default | Description                                                                                                    |
| ---------------------- |:--------:|:----------:| ----------------------------------------------------------------------------------------------------------- |
| target-id              | Yes      |            | The id with which the toggle event is triggered                                                             |

#### Template methods

| Name                             | Arguments |  Description                                                           |
| -------------------------------- |:---------:| ---------------------------------------------------------------------- |
| toggle                           |           | Triggeres the toggle event                                             |

#### Template properties

| Name                             |  Description                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| state                            | Can be 'hidden' or something else                                                                               |
| isActive                         | Is false if the state is 'hidden' or 'removed'                                                                  |
| targetId                         | Passed attribute value, see `target-id` attribute                                                               |

To react on the "toggle" event triggered by the `bs4-toggle-button` component you need to create a object of `EventDispatcher` like this:

```typescript
import { EventDispatcher } from '@ribajs/core';
// The id must be identical to the id of the `bs4-toggle-button`
const id = 'example-sidebar';
const toggleButtonEvents = new EventDispatcher('bs4-toggle-button:' + id);
toggleButtonEvents.on('toggle', () => {
  // do something
});
```

After reacting to the toggle event, you should fire an event yourself to let the `bs4-toggle-button` component know that your logic has toggled:

```typescript
toggleButtonEvents.trigger('toggled', 'hidden');
```

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs4-toggle-button-component" class="pt-3">
      <template type="single-html-file">
        <bs4-toggle-button target-id="main-sidebar" class="p-3">
          <button rv-on-click="toggle" class="btn btn-warning">
            Click to toggle the main sidebar <span rv-hide="isActive">(Inactive)</span><span rv-show="isActive">(Active)</span>
          </button>
        </bs4-toggle-button>
        <bs4-toggle-button target-id="example-sidebar" class="p-3">
          <button rv-on-click="toggle" class="btn btn-info">
            Click to toggle the sidebar in the example below <span rv-hide="isActive">(Inactive)</span><span rv-show="isActive">(Active)</span>
          </button>
          <p class="m-3"><em>Before you click on this button, make sure that the preview of the sidebar component example is open.</em></p>
        </bs4-toggle-button>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
