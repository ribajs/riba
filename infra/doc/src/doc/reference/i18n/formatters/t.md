This formatter resolves a translation key path in a mustache text node and re-renders when the language changes. For element content and attributes, the **`i18n-*` binders** (`rv-i18n-text`, `rv-i18n-html`, …) are more explicit and support the source markup and inline templates, see [rv-i18n-[type]](binders/i18n-[type].md).

In **mustache** text nodes, Riba’s default delimiters are a **single** `{` and `}` (see [configuration: `templateDelimiters`](../../../guide/usage/configuring.md)). That differs from Liquid/Shopify, which use `{{` and `}}` — do not copy that syntax here. Double braces are the placeholders *inside* a translation, not Riba’s syntax.

```html
{ 'examples.newsletter.title' | t }
```

### Arguments

```html
{ 'form.newsletter.title' | t }
{ 'form.newsletter.title' | t 'de' }
{ 'cart.items' | t vars }
{ 'cart.items' | t 'de' vars }
```

| Argument | Type | Description |
| -------- | ---- | ----------- |
| langcode | `string` | Read the message of that language instead of the active one, without switching |
| variables | `object` | Values for the `{{ placeholders }}` of the message and the `count` that selects the plural form |

Both are optional and may be given in any order: a string argument is a langcode, an object is the variables. A langcode can be a literal in the markup, the variables are a keypath read from the view model, so a text node with variables has to be bound:

```typescript
const model = {
  vars: { count: 3, name: "Pascal" },
};
```

```html
<p>{ 'cart.items' | t vars }</p>
<!-- with de: { cart: { items: { one: "{{ count }} Artikel", other: "{{ count }} Artikel" } } } -->
<!-- renders "3 Artikel" in the active language -->
```

A langcode argument reads a language that may not be loaded yet: with a `LocalesRestService` and `en` active, a `t 'de'` renders the key until `de` has been loaded once, for example by `setLangcode("de")` or `preload("de")`. Translate the active language instead when the text must always be complete.

### Missing keys

The formatter renders the **key itself** when neither the active language nor a fallback chain has the message:

```html
{ 'form.unknown' | t } <!-- renders: form.unknown -->
```

The `missing` option of the service still applies: with `missing: "marker"` the text becomes `translation missing: "form.unknown"`, and with `missing: "throw"` the error is thrown while the text node is rendered. Before the service is ready the text is empty and re-renders with the message in the `ready` event.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-t-formatter">
      <template type="single-html-file">
        <p>{ 'examples.newsletter.title' | t }</p>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

The formatter subscribes to `changed` (and to `ready` while the service is not ready yet) through the view model, and the subscriptions are removed when the view is unbound.
