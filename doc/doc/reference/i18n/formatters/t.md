
This formatter can be used to obtain the translation of a keypath string, but has a great limitation because this formatter does not respond to any language change. Therefore, we recommend using the `i18n-[type]` binder instead.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-text">
      <template type="single-html-file">
        { 'examples.newsletter.title' | t }
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
