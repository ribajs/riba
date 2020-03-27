Sets the scroll position (`"top"`, `"scrolled"`, `"bottom"`) to the element as a data attribute, useful if you want to define styles depending on the scroll position.

Options can be passed via data attributes, e.g `data-placement="right"`

| Name                  | Default    |  Description                                                                                                                         |
| ----------------------| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `data-offset-top`     | `10`       | Top offset, the scroll position is `"top"` as long as the scroll position is smaller than the top offset or 0                        |
| `data-offset-bottom`  | `10`       | Bottom offset, the scroll position is `"bottom"` as long as the scroll position is on the end or just before according to the offset |

The binders value is a selector to the element you want to watch the scroll event for
| Default    |  Description                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `'window'` | Can be `'window'` for the Window object, `'this'` for the current element or any selector like `'#page-wrapper'`                     |

An example style could be look like this

```scss
body:not([[data-scroll-position-y='top']) {
  padding-top: 3em;
}
```

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="data-scroll-position-y-binder">
      <template type="single-html-file">
        <div class="scrollbar-y-auto" rv-data-scroll-position-y="'this'">
          <p><strong>The Background color changes depending on the scroll position top, scrolled or bottom to red, yellow or blue.</strong></p>
          <rv-lorem-ipsum generate-paragraphs="5"></rv-lorem-ipsum>
        </div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
