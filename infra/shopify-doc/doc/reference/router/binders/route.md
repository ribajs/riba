Loads a link and injects the content insite the view container, in addition, the link is pre-loaded on a mouse over.
This binder is like a normal link in barba.js but allows a bit more control.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-icon">
      <template type="single-html-file">
        <a rv-route="'/pages/iconset'" href="/pages/iconset" class="m-3">Click to open Iconset</a>
        <button rv-route="'/pages/guide'" class="btn btn-primary m-3">Click to open Guide</button>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

Instead of the URL you can also pass some options to the binder as a object (by keypath) or as a json string

| Option name           | Default          | Description                                                                              |
| --------------------- | ---------------- |:-----------------------------------------------------------------------------------------|
| url                   |                  | The url you want to load on a click                                                      |
| viewId                | `'main'`         | The id of the view in which the content should be replaced                               |
| removeAfterActivation | `false`          | If you wish to remove the element from the DOM after activation                          |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-icon">
      <template type="single-html-file">
        <a rv-route="{'viewId': 'example-view', 'removeAfterActivation': false}" href="/pages/router-example-view-page" class="btn btn-danger m-3">Click to load a page insite of the view binder example below</a>
        <p class="m-3"><em>Before you click on this button, make sure that the preview of the view binder example below is open.</em></p>
        <a rv-route="" href="/pages/router-example-view-page" target="_blank" class="btn btn-success m-3">Click to open the page in a new tab.</a>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
