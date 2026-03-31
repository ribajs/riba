
This formatter resolves a translation key path and now re-renders when the active language changes. For element content/attributes, the **`i18n-*` binders** (`rv-i18n-text`, `rv-i18n-html`, …) are still recommended because they are more explicit and support rich translation templates directly.

In **mustache** text nodes, Riba’s default delimiters are a **single** `{` and `}` (see [configuration: `templateDelimiters`](../../../guide/usage/configuring.md)). That differs from Liquid/Shopify, which use `{{` and `}}` — do not copy that syntax here.

```html
{ 'examples.newsletter.title' | t }
```

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-t-formatter">
      <template type="single-html-file">
        <p>{ 'examples.newsletter.title' | t }</p>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
