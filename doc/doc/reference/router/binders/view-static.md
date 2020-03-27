Loads the content of the url with pjax and replaces this with the inner html of the element

| Option name           | Type             | Default                  | Description                                                                       |
| --------------------- | ---------------- | ------------------------ |:----------------------------------------------------------------------------------|
| url                   | `string`  |                                 | The url whose content you want to display                                         |
| viewId                | `string`  | `handleized url`                | The id of the view, must be unique and is only needed with multiple view binders, should be set via the `id` attribute  |
| containerSelector     | `string`  | `[data-namespace]`              | Selector of the container child, here the HTML content is replace                 |
| transition            | `Transition` | `HideShowTransition`         | The transition object e.g. for animations                                         |


<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="view-static-binder">
      <template type="single-html-file">
        <div rv-view-static="{'url': '/pages/iconset'}" class="m-3"></div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
