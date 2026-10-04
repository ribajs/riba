Sets the translation of a key path as `text`, `html`, `value` or any attribute: `rv-i18n-<target>="'<key path>'"`. The value of the binder is the key path as a quoted string, the target comes from the attribute name.

| Binder | Sets |
| ------ | ---- |
| `rv-i18n-text` | `textContent` |
| `rv-i18n-html` | `innerHTML`, for a message that contains markup |
| `rv-i18n-value` | `value` of an input, `innerHTML` on a `contenteditable` element |
| `rv-i18n-<attributeName>` | the attribute of that name, e.g. `rv-i18n-placeholder` |

The binder reads the messages from the registered `LocalesService` and re-renders on its `ready` and `changed` events; the listeners are removed when the view is unbound.

### i18n-text

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-text">
      <template type="single-html-file">
        <h5 rv-i18n-text="'examples.newsletter.title'"></h5>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### i18n-html

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-html">
      <template type="single-html-file">
        <p rv-i18n-html="'examples.newsletter.description_html'"></p>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### i18n-value

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-value">
      <template type="single-html-file">
        <input type="text" rv-i18n-value="'examples.newsletter.input_value'" />
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### i18n-[attributeName]

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-placeholder">
      <template type="single-html-file">
        <input type="text" rv-i18n-placeholder="'examples.newsletter.placeholder_last_name'" />
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### Source restore

The content an element has when the binder binds is its **source**: the language the markup is written in (option `sourceLangcode`). The source is restored when the active language has no message for the key, so a page that is only partly translated stays readable, and switching back to the source language gives your markup back unchanged:

```html
<h1 rv-i18n-text="'examples.newsletter.title'">Sign up for the newsletter</h1>
<!-- source language active: "Sign up for the newsletter"
     de active:        "Melde dich für den Newsletter an"
     fr active:        no message in fr or its fallbacks, the markup again -->
```

For an attribute target the source is the attribute as it was; an attribute that did not exist is removed again instead of being set to an empty string. Empty messages are applied, so a translation can blank a text.

What happens with a key that no language has is the `missing` option of the service: `keep` (default) keeps the source markup, `marker` writes `translation missing: "<key>"`, and `throw` logs the error to the console and keeps the markup, because the binder catches it.

### Inline templates

Instead of a catalog you can put the translations of one element into `<template lang="…">` children. The `{{ placeholders }}` of a message are filled from the `data-*` attributes of the element and from `<template name="…">` children:

```html
<p rv-i18n-html="'form.greeting'" data-name="Pascal">
  Hello
  <template lang="de">Hallo {{ name }}</template>
  <template lang="default">Welcome</template>
</p>
```

```html
<p rv-i18n-html="'form.greeting'">
  Hello
  <template lang="de">Hallo {{ name }}</template>
  <template name="name">Pascal</template>
</p>
```

```typescript
const locales = {
  de: { form: { greeting: "Hallo {{ name }}" } },
};
```

The variable `count` provided by `data-count="3"` selects the plural form of a message, see [LocalesService](services/locales-base-service.md).

A `<template lang>` is matched like a language code, so `de-AT` uses the `<template lang="de">`. Templates and variables are read once when the binder binds, and only the `lang` attribute makes a template a translation — a `<template name>` is a variable, never a translation.

The element picks the first of these that exists:

1. the `<template lang>` of the active language
2. the message of the active language or of a fallback, with the variables interpolated
3. the `<template lang="default">`
4. the `missing` strategy of the service, which keeps the source markup by default

Without a key in the binder expression (`rv-i18n-html=""`) only the inline templates apply, which is the shortest way to translate one element:

```html
<p rv-i18n-html="">Hello<template lang="de">Hallo</template></p>
```

For the content of a mustache text node, use the [`t` formatter](../formatters/t.md) instead.
