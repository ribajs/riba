Every event is emitted on the **`LocalesService` instance** you pass to `i18nModule.init({ localesService })`. Each service owns its own dispatcher (`localesService.event`), so two services never hear each other.

Subscribe with `on()`, which is typed by `LocalesEvents` and returns the function that unsubscribes:

```typescript
const unsubscribe = localesService.on("changed", (langcode, previousLangcode) => {
  console.debug("The language changed", previousLangcode, "->", langcode);
});

unsubscribe();
```

`localesService.event` is the plain `EventDispatcher` of `@ribajs/events`, useful when you need `once()`, `off()` or a shared callback:

```typescript
localesService.event.on("ready", (langcode: string) => {
  console.debug("Locales are initialized; safe to translate", langcode);
});
```

| Name      | Arguments                            | Emitted when                                                                                  |
| --------- | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| `ready`   | `langcode`                           | `init()` finished, the first language is active and its messages are loaded                  |
| `changed` | `langcode`, `previousLangcode`       | `setLangcode()` activated another language than before                                        |
| `missing` | `path`, `langcode`                   | `translate()` found no message for `path` in the active language or in a fallback            |
| `error`   | `error`                              | `init()` or loading the messages of a language failed                                          |

Details worth knowing:

- `ready` fires once, because `init()` is idempotent and every call returns the same promise.
- `changed` does not fire for the language `init()` detected, and not when `setLangcode()` sets the language that is already active.
- `missing` fires per key from `translate()` only. `lookup()` and `has()` read without the `missing` strategy and emit nothing.
- `error` is emitted *in addition to* the rejection: `init()` and `setLangcode()` reject, they never resolve with the error as a value. Because `setLangcode()` loads the messages before it applies the language, a `changed` listener can call `translate()` synchronously.

An `rv-i18n-*` binder catches an error while it renders, logs it to the console and falls back to the source markup; the `i18n-switcher` component does the same for a failed switch.

`dispose()` removes all listeners and drops the cached messages; the service is unusable afterwards.
