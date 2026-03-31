Use this component to switch to another available language. It does not ship with a template: add your own markup as children (e.g. buttons bound to `langcodes`).

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
| switch                           | langcode: Langcode | Activates the given language (`Langcode.code`) if it is not already active |
| toggle                           |                    | Switches to the other language (only useful when exactly two languages exist) |

#### Template properties

| Name                             | Type          |  Description                                                                               |
| -------------------------------- |:-------------:|------------------------------------------------------------------------------------------- |
| langcodes                        | `Langcode[]`  | Language codes from your locales object (with `active` set for the current one)          |
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
