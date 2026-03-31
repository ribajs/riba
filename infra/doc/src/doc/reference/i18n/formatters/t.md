
This formatter resolves a translation key path, but it only reacts indirectly to language changes (via internal `ready` / `changed` subscriptions). Prefer the **`i18n-*` binders** (`rv-i18n-text`, `rv-i18n-html`, …) for elements that should update when the language changes.

In **mustache** text nodes, Riba’s default delimiters are a **single** `{` and `}` (see `Riba.templateDelimiters`). That differs from Liquid/Shopify, which use `{{` and `}}` — do not copy that syntax here.

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
