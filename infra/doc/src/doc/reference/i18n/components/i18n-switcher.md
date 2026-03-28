Use this component to switch to another available language, this component does not have its own template, so you neet to set this as child elements of this component by yourself.

#### Types

```typescript
export interface Langcode {
  code: string;
  active: boolean;
}
```

#### Template methods

| Name                             | Arguments          |  Description                                                           |
| -------------------------------- |:------------------:| ---------------------------------------------------------------------- |
| switch                           | langcode: Langcode | Triggeres the toggle event                                             |
| toggle                           |                    | Toggle to another language (only useful for two supported languages)   |

#### Template properties

| Name                             | Type          |  Description                                                                               |
| -------------------------------- |:-------------:|------------------------------------------------------------------------------------------- |
| langcodes                        | `Langcode[]`  | Array of founded langcodes from your locales object                                        |
| ready                            | `boolean`     | Is `true` if the locales are initialized                                                   |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="i18n-switcher">
      <template type="single-html-file">
        <i18n-switcher>
          <div class="btn-group btn-group-toggle" rv-each-langcode="langcodes">
            <button
              class="btn btn-primary"
              rv-text="langcode.code"
              rv-on-click="switch | args langcode"
              rv-class-active="langcode.active"
            ></button>
          </div>
        </i18n-switcher>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
