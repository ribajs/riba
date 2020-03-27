Gets the (current selected) translation of a keypath string from your locales object (over the TranslationService).
The translation is set as `html`, `text` or `value` depending on the passed type, available types are `html`, `text` and `value`.
If the type is not known, the translation is instead set as an attribute with the given name, a useful example for this could be the `placeholder` attribute.

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
    <rv-example-tabs class="pt-3" handle="i18n-html">
      <template type="single-html-file">
        <input type="text" rv-i18n-value="'examples.newsletter.input_value'" />
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### i18n-[attributeName]

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-html">
      <template type="single-html-file">
        <input type="text" rv-i18n-placeholder="'examples.newsletter.placeholder_last_name'" />
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
