`router-view` is the heart of the router module. If you want to develop a **single-page application**, the main content should use this component to dynamically exchange its content. Conceptually, this is similar to a transition wrapper/container pattern as used by PJAX-like routing solutions. As a bigger example this site also uses this component to dynamically load its content. Your application can also have multiple views; only the ids need to be different.
  
The component attributes map to the following options:

| Option name           | Type         | Default                              | Description |
| --------------------- | ------------ | ------------------------------------ | :---------- |
| id                    | `string`     | `'main'`                             | The view id. Must be unique when using multiple views. |
| containerSelector     | `string`     | auto-derived from `id`               | Defaults to `router-view > *:first-child` for `main`, otherwise `router-view#<id> > *:first-child`. |
| action                | `string`     | `'replace'`                          | Replaces the old container content with the new one. |
| scrollToTop           | `boolean`    | `true` for `main`, else `false`      | Auto-scroll to top after route transition. |
| listenAllLinks        | `boolean`    | `true`                               | Loads content of links globally, even without `rv-route`. |
| listenPopstate        | `boolean`    | `true`                               | Handles browser back/forward navigation. |
| scrollToAnchorHash    | `boolean`    | `true` for `main`, else `false`      | Scrolls to URL hash target after transition. |
| scrollToAnchorOffset  | `number`     | `RouterService.options.scrollToAnchorOffset` | Offset for hash scrolling. |
| datasetToRootScope    | `boolean`    | `true`                               | Binds container `data-*` values to `$root.dataset`. |
| parseTitle            | `boolean`    | `true`                               | Parses `<title>` and updates the tab title. |
| changeBrowserUrl      | `boolean`    | `true`                               | Updates browser URL during navigation. |
| prefetchLinks         | `boolean`    | `true`                               | Prefetches on hover/touchstart to speed up page loading. |
| transition            | `Transition` | `HideShowTransition`                 | Transition object for page swap behavior. |
| transitions           | `TransitionDefinition[]` | `[]`                     | Declarative transition list with rule-based selection. |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="view-binder">
      <template type="single-html-file">
        <router-view
          id="example-view"
          listen-all-links="false"
          listen-popstate="false"
          scroll-to-top="false"
          scroll-to-anchor-hash="false"
          change-browser-url="false"
          prefetch-links="false"
        >
          <div id="example-view-container">
            <p>
              This is the content of the element with the router-view component.
            </p>
            <button
              rv-route="{'url': 'router-view-example-target.html', 'viewId': 'example-view'}"
              class="btn btn-danger m-3"
            >
              Click to load a page
            </button>
          </div>
        </router-view>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
