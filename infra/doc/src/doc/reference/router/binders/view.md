This binder is the heart of the router module. If you want to develop a **single-page application** then the main content should use this binder to dynamically exchange its content. This binder is what the `barba-wrapper` and `barba-container` are in barba.js (see [barba install documentation](https://barba.js.org/v1/installation.html)). As a bigger example this site also uses this binder to dynamically load its content. Your application can also have multiple view binders, only the ids need to be different. In the example below we also use an additional view binder (next to our main view binder) to demonstrate the functionality.
  
The binder attribute value accepts an object or json string with the following available options:

| Option name           | Type             | Default                  | Description                                                                              |
| --------------------- | ---------------- | ------------------------ |:-----------------------------------------------------------------------------------------|
| viewId                | `string`  | `'main'`                           | The id of the view, must be unique and is only needed with multiple view binders, should be set via the `id` attribute |
| containerSelector     | `string`  | `[data-namespace]` if viewId is `'main'` otherwise `#${viewId} > *:first-child`                         | Selector of the container child, here the HTML content is replace         |
| action                | `string`  | `'replace'`                                | Replaces the old container content with the new one                       |
| scrollToTop           | `boolean` |`true` if viewId is `'main'` otherwise `false` | Auto scrolls to the top of the page when the new page is loading       |
| listenAllLinks        | `boolean` |`true` if viewId is `'main'` otherwise `false` | Loads the content of all links, even without the `route` binder        |
| listenPopstate |`boolean` |`true` if viewId is `'main'` otherwise `false`| Responds to the browsers go back button and loads the content of the previous page |
| scrollToAnchorHash    | `boolean` |`true` if viewId is `'main'` otherwise `false` | Auto scrolls to the anchor id passed by the url hash value             |
| datasetToModel |`boolean` |`true` if viewId is `'main'` otherwise `false` | Binds the values passed as data attributes to the model / scope of this binder |
| parseTitle            | `boolean` |`true` if viewId is `'main'` otherwise `false` | Parses the `<title></title>` and replace the tab name                  |
| changeBrowserUrl      | `boolean` |`true` if viewId is `'main'` otherwise `false` | Changes the browser URL when the new page is loading                   |
| prefetchLinks| `boolean` |`true` if listenAllLinks is `true` otherwise `false`| Loads the content of the url on mouse over to speed up the page loading|
| transition            | `Transition` | `HideShowTransition`                       | The transition object e.g. for animations                              |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="view-binder">
      <template type="single-html-file">
        <div
          id="example-view"
          rv-view="{'containerSelector': '#example-view-container', 'datasetToModel': true, 'changeBrowserUrl': false}"
        >
          <div id="example-view-container">
            <p>
              This is the content of the element with the rv-view binder.
            </p>
            <button rv-route="{'url': '/pages/router-example-view-page', 'viewId': 'example-view'}" class="btn btn-danger m-3">Click to load a page</button>
          </div>
        </div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
