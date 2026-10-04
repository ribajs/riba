Use this component to switch to another available language. It does not ship with a template: add your own markup as children, for example buttons bound to `langcodes`.

The languages come from the configuration of the `LocalesService`, never from the component: the scope `langcodes` is `localesService.getAvailableLangcodes()`, which reads the `langcodes` option (or the keys of the catalog of a `LocalesStaticService`). Add a language there and it shows up in the switcher, remove it and it disappears. The component re-reads the list on `ready` and `changed`, which only updates the `active` flag of an entry.

#### Types

```typescript
export interface Langcode {
  code: string;
  active: boolean;
}
```

#### Template methods

| Name | Arguments | Description |
| ---- | --------- | ----------- |
| switch | `langcode: Langcode`, `event?: Event` | Activates `langcode.code` if that language is not active. Calls `preventDefault()` and `stopPropagation()` when an event is passed, so it also works inside a link. |
| toggle | `event?: Event` | Switches to the first language that is not active; useful with exactly two languages |

Both methods catch a failed switch and log it to the console; `setLangcode()` is asynchronous because it loads the messages first.

#### Template properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| langcodes | `Langcode[]` | The languages of the service configuration, with `active` set for the current one |
| ready | `boolean` | `true` once the service has loaded the first language |

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

With `persist: true` on the service the language a visitor picks is remembered in `localStorage`, with `detect: ["storage", …]` the switcher opens in that language on the next visit.
