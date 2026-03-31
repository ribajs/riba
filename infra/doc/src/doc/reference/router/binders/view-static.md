Loads the content of a url with pjax and replaces the host element with the fetched container element (default selector: `[data-namespace]`).

| Option name           | Type             | Default                  | Description                                                                       |
| --------------------- | ---------------- | ------------------------ |:----------------------------------------------------------------------------------|
| url                   | `string`  |                                 | The url whose content you want to display                                         |
| viewId                | `string`  | `handleized url`                | Logical view id derived from the url (used by this binder setup)                  |
| containerSelector     | `string`  | `[data-namespace]`              | Selector of the container child, here the HTML content is replace                 |
| transition            | `Transition` | `HideShowTransition`         | The transition object e.g. for animations                                         |


<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="view-static-binder">
      <template type="single-html-file">
        <div rv-view-static="{'url': 'iconset.html'}" class="m-3"></div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

`rv-view-static` is a block binder and internally disables global link listening, popstate handling, title parsing, and browser url changes for its internal pjax instance.
