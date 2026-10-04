# Migration Guide

Upgrade notes for breaking changes across major Riba.js releases. For the full
per-version change log, see [CHANGELOG.md](./CHANGELOG.md).

---

## 2.0.0 release candidates → next

`@ribajs/i18n` was rewritten. A pure `Translator` resolves a key through a
fallback chain, `LocalesService` owns the language state (detection,
persistence, source language) and only the loaders know how the messages of one
language arrive. Failures are events and rejections instead of return values,
and the markup you wrote is the source language.

### @ribajs/i18n

#### Constructor arguments: three booleans → options object

The booleans `doNotRetranslateDefaultLanguage`, `showMissingTranslation` and
`autoDetectLangcode` are gone. Pass a `LocalesOptions` object instead,
`LocalesRestService` adds `loadSourceCatalog` to it.

| Old flag                          | New                                                        |
| --------------------------------- | ---------------------------------------------------------- |
| `doNotRetranslateDefaultLanguage` | removed, `sourceLangcode` names the language of the markup |
| `showMissingTranslation: true`    | `missing: "marker"`                                        |
| `autoDetectLangcode: true`        | `detect: ["navigator", "html"]`                            |

```ts
// before
new LocalesRestService("/locales.json", false, true, true);

// after
new LocalesRestService("/locales.json", {
  langcodes: ["en", "de"],
  detect: ["query", "storage", "html", "navigator"],
  persist: true,
  missing: "marker",
});
```

`detect` is read in the given order and the first match wins, its default is
`["html"]`. `persist` writes the chosen language to `localStorage`
(`storageKey`, default `riba:i18n:langcode`), `queryParam` (default `lang`)
serves `detect: ["query"]` and `syncHtmlLang: false` stops writing the `lang`
attribute of the html element. Every access to `document`, `window`,
`navigator` and `localStorage` is guarded, so the service also runs without a
DOM (SSR).

The base class needs the `langcodes` option,
`LocalesStaticService` falls back to the keys of its catalog. Its `id`
argument is gone:

```ts
// before
new LocalesStaticService(catalog, "main", false, false, true);
// after
new LocalesStaticService(catalog, { detect: ["navigator", "html"] });
```

#### Instance access: `getInstance()` → `I18nService.getLocalesService()`

`LocalesRestService.getInstance(url)`, `LocalesStaticService.getInstance(id)`
and both `instances` maps are removed, and a constructor no longer hands back a
shared instance. Read the registered service, or keep your own reference:

```ts
// before
const localesService = LocalesRestService.getInstance("/locales.json");

// after
import { I18nService } from "@ribajs/i18n";
const localesService = I18nService.getLocalesService();
```

`i18nModule.init({ localesService })` registers the service and calls its
`init()`; registering a different service afterwards throws until
`I18nService.reset()` was called.

#### `get()` / `getByCurrentLang()` → `translate(path, vars?, langcode?)`

`translate()` is synchronous, takes the key without the langcode and accepts a
dot path or an array of segments. The langcode is the last argument and
defaults to the active language, so the `force` argument has no equivalent:

```ts
// before
await localesService.get([langcode, "form", "newsletter", "title"], { name });
await localesService.getByCurrentLang(["form", "newsletter", "title"]);

// after
localesService.translate("form.newsletter.title", { name });
localesService.translate(["form", "newsletter", "title"], { name }, "de-AT");
```

- `translate()` returns `undefined` when no language of the fallback chain has
  the key and applies the `missing` option.
- `lookup()` reads without the `missing` option and without emitting `missing`.
- `has()` answers the same question as a boolean.
- All three throw before `init()` has resolved; await `init()` or `whenReady()`
  first.

#### `getAvailableLangcodes()` is synchronous

```ts
// before
const langcodes: Langcode[] = await localesService.getAvailableLangcodes();
// after
const langcodes: Langcode[] = localesService.getAvailableLangcodes();
```

The list is a read of the configured languages, so it no longer triggers a
request.

#### `setLangcode()` is async and rejects

```ts
// before
localesService.setLangcode("de");
localesService.setLangcode("de", true); // initial

// after
await localesService.setLangcode("de");
```

The switch loads the messages of the language first, so `changed` fires when
translations can be read synchronously. It rejects for a langcode that is not
available and keeps the current language. The `initial` argument is gone:
`changed` fires only when the language really changed and only for a user
choice, never for the detected one. `preload("de")` loads a language ahead of a
switch.

#### Event arguments

```ts
// before
localesService.event.on("ready", (langcode, translationNeeded) => {}, this);
localesService.event.on("changed", (langcode, initial) => {}, this);

// after
const offReady = localesService.on("ready", (langcode) => {});
const offChanged = localesService.on(
  "changed",
  (langcode, previousLangcode) => {},
);
offReady();
```

- `ready(langcode)` — the second argument `translationNeeded` is gone.
- `changed(langcode, previousLangcode)` — the second argument is the previous
  language, not an `initial` flag.
- New: `missing(path, langcode)` and `error(error)`.
- `service.on(name, callback)` returns the unsubscribe function and is typed
  with `LocalesEvents`. `service.event` is still the raw `EventDispatcher`, but
  it is no longer registered under the global `i18n` namespace, so
  `EventDispatcher.getInstance("i18n")` does not return it. `dispose()` drops
  all listeners and cached messages.

#### Errors: return value → events and rejection

`get()` caught its own errors and returned the `Error` as a value, `init()`
reset `ready` and returned the error as well:

```ts
// before
const locale = await localesService.get(["de", "form", "title"]);

// after
localesService.on("error", (error) => console.error(error));
try {
  await localesService.init();
} catch (error) {
  console.error(error);
}
```

`init()` is idempotent, rejects and emits `error`; the service stays not ready.
`setLangcode()` emits `error`, rejects and leaves the language unchanged.

#### `LocalesRestService`: one request per language, plus hooks

```ts
// before: one file with all languages, read once
new LocalesRestService("/locales.json", false, false, true);

// after: the url may be a function of the langcode
new LocalesRestService((langcode) => `/locales/${langcode}.json`, {
  langcodes: ["en", "de"],
});
```

- A language is requested the first time it is needed and cached afterwards.
  Requests to the same URL are shared, so several languages in one file still
  cost one request.
- The catalog of the source language is not requested unless
  `loadSourceCatalog: true` — the markup already is the source language.
- The generic service no longer appends `?shop=`.
  [`@ribajs/shopify-tda`](./packages/shopify-tda/src/services/locales.service.ts)
  adds it in its own `buildUrl`.

Subclasses use the new hooks instead of patching the request:

```ts
// one file with all languages
class MyLocalesService extends LocalesRestService {
  protected buildUrl(url: string, langcode: string) {
    return `${url}?lang=${langcode}`;
  }

  protected parse(body: unknown, langcode: string) {
    return (body as Record<string, MessageTree>)[langcode];
  }

  protected async resolveLangcodes() {
    const body = await this.fetchJSON(this.urlFor(this.sourceLangcode));
    return Object.keys(body as Record<string, MessageTree>);
  }
}
```

`parseTemplateVars()` and `parseLocalVars()` were removed from the base class;
the markup helpers are now the exported functions `parseTemplateVars()` and
`parseInlineTranslations()` in
[`packages/i18n/src/utils/template-vars.ts`](./packages/i18n/src/utils/template-vars.ts).
`getInitialLangcode()` is now `getSourceLangcode()`; `getHTMLLangcode()` and
`getBrowserLangcode()` are gone, the service reads the `lang` attribute and the
browser languages itself. A custom service implements
`protected load(langcode): Promise<MessageTree | undefined>` instead of the old
`protected getAll(): Promise<any>`.

#### Missing keys keep the source markup

`rv-i18n-*` remembers the content the element had when the binder bound and
restores it when the source language is active or a key has no translation, so
a missing key no longer leaves the text of the previous language in place. The
`missing` option decides what happens instead:

| `missing`          | `translate()` returns                           |
| ------------------ | ----------------------------------------------- |
| `"keep"` (default) | `undefined`, the binder keeps the source markup |
| `"marker"`         | `translation missing: "path.to.key"`            |
| `"throw"`          | throws                                          |

An inline `<template lang="de">` is matched by language variant now, so it also
serves `de-AT`. `<template lang="default">`, `<template name="…">` vars and
`data-*` vars work as before.

#### Empty strings are valid translations

A message that exists is a message, so an empty string is a translation and not
a missing key:

```json
{ "en": { "cart": { "note": "" } } }
```

The old code tested `if (!locale)` and treated `""` as missing.

#### The `t` formatter is synchronous

`read()` returned a promise before (and `null` when no language was active), and a
key without a translation never produced a value. It now reads synchronously
and renders the key itself when nothing translates it. Arguments are a langcode
and/or a keypath with variables:

```html
<!-- before -->
<p>{ 'examples.newsletter.title' | t }</p>

<!-- after -->
<p>{ 'examples.newsletter.title' | t }</p>
<p>{ 'cart.items' | t 'de' }</p>
<p>{ 'cart.items' | t vars }</p>
<p>{ 'cart.items' | t 'de' vars }</p>
```

Plural forms are selected by the `count` variable, `zero`, `one` and `two` match
the exact number first, everything else follows `Intl.PluralRules` of the
language. A key that is missing renders as the key path until the service is
ready, then as the key path again. `LocalVar` is now `LocalVars` and
`LocalPluralization` is now `PluralForms`.

---

## 1.x → 2.0.0

Riba.js 2.0 is an ESM-only, modernized baseline. Downstream projects need to
adjust their toolchain and a handful of framework APIs.

### Toolchain requirements

- **Node.js `>= 24.0.0`.** Older runtimes are not supported.
- **Package manager: Yarn Berry (v4) in PnP mode.** The repo no longer supports
  npm. Delete `node_modules` and `package-lock.json` and run `yarn install`.
- **Bundler: Vite.** The legacy webpack 4 configuration was removed. Use the
  shared configs in [`infra/vite-config`](./infra/vite-config/).
- **Test runner: Vitest.** Jest is no longer used. `jest.*` files must be
  converted to `*.spec.ts` under Vitest.
- **Targets modern evergreen browsers only.** `core-js`, `@types/core-js`, and
  legacy runtime branches (`attachEvent`, script `readyState`,
  `createTextRange`) were removed from `@ribajs/utils` and `@ribajs/core`. If
  you need IE/legacy support, stay on the 1.x line.

### Framework API changes

- **Function binder signature.** Template callbacks no longer receive the
  binder as the first argument; the DOM event is now the first parameter.

  ```ts
  // before
  public toggle(context?: BinderDeprecated<any>, event?: Event) { /* … */ }

  // after
  public toggle(event?: Event) { /* … */ }
  ```

- **`this.el` was removed from components.** Component methods now use `this`
  directly (the component *is* the element). Rename any `this.el.querySelector`
  etc. to `this.querySelector`.

- **Deprecated legacy binders in `@ribajs/core` were removed.** Replace
  usages with their modern equivalents (`block`, `class-name`, `remove-class`,
  `style-background`, `style-property`, `toggle-on-event`, etc.).

- **Formatter rename: `stripHtml` → `strip-html`** (kebab-case convention).

- **Template engine: Pug → JSX.** Components now use JSX templates via
  [`@ribajs/jsx`](./packages/jsx/). Existing Pug templates must be converted.

### Package changes

**Removed packages** (find replacements below):

| Removed                      | Replacement / Note                          |
| ---------------------------- | ------------------------------------------- |
| `@ribajs/bs4`                | `@ribajs/bs5`                               |
| `@ribajs/photoswipe`         | `@ribajs/bs5-photoswipe`                    |
| `@ribajs/vue`                | (dropped — no replacement)                  |
| `@ribajs/pdf`                | (dropped — no replacement)                  |
| `@ribajs/typedoc`            | moved to [`gjsify/doc`](https://github.com/gjsify/doc) |
| `@ribajs/alosaur` + Deno stack | (dropped)                                  |
| `@ribajs/webpack-serve`      | Use Vite dev server (see `infra/vite-config`) |
| `@ribajs/shopify-gulp`       | Gulp tooling dropped                        |
| `@ribajs/nest-theme`, `@ribajs/nest-lunr`, `@ribajs/deno-ssr`, `@ribajs/node-graphql-client` | Moved to a separate backend repository |

**Renamed packages:**

- `@ribajs/nest-ssr` → `@ribajs/nest-theme`
- `@ribajs/deno-ssr` → `@ribajs/deno-node-ssr`

**New packages in 2.0:** `@ribajs/bs5`, `@ribajs/bs5-photoswipe`,
`@ribajs/tw` (Tailwind CSS v4), `@ribajs/jsx`, `@ribajs/lottie`,
`@ribajs/fuse`, `@ribajs/luxon`, `@ribajs/masonry`, `@ribajs/podcast`,
`@ribajs/accessibility`, `@ribajs/strapi`, `@ribajs/artcodestudio`,
`@ribajs/empty-template`, `@ribajs/events`, `@ribajs/ssr`,
`@ribajs/shopify-nest`.

### Bootstrap: `@ribajs/bs4` → `@ribajs/bs5`

The Bootstrap 4 module is gone; use `@ribajs/bs5`. Besides renaming the
package and the `bs4-*` prefixes to `bs5-*`, update the aspect-ratio class
names to the Bootstrap 5 `ratio` convention:

- **Background-based**
  - `.background-box` → `.embed-responsive-bg`
  - `.ratio-[bp]-[x]-[y]` → `.embed-responsive-bg-[bp]-[x]by[y]`
    (e.g. `.ratio-md-4-3` → `.embed-responsive-bg-md-4by3`)
- **Object-based**
  - `.content-box` → `.embed-responsive`
  - `.content` → `.embed-responsive-item`
  - `.ratio-[bp]-[x]-[y]` → `.embed-responsive-[bp]-[x]by[y]`

Set the SCSS variable `$embed-responsive-aspect-ratios` to preserve the full
legacy set:

```scss
$embed-responsive-aspect-ratios: (
  (1 1),(3 2),(2 3),(2 1),(1 2),(4 3),(3 4),(16 9),(9 16),
  (10 3),(3 10),(17 10),(10 17),(14 9),(9 14),(21 9),(9 21)
);
```

### Bootstrap 5.3 color mode

`@ribajs/bs5` adopts Bootstrap 5.3's native color-mode system. The old custom
OS-based theme detection was removed.

- SCSS helper classes `theme-light` / `theme-dark` were renamed to `tl` / `td`.
- Use `data-bs-theme="light"|"dark"` on a parent element (per Bootstrap 5.3
  conventions) instead of the legacy class names.

### Router

- New Fade transition and a transition class applied on `<router-view>`. If
  you maintained a custom transition, inspect the new base classes in
  [`packages/router/src/services/Transition/`](./packages/router/src/services/Transition/).

### Removed integrations

- **Podlove legacy polyfill loader** was removed from the podcast web-player
  integration. If you relied on it for older browsers, load the polyfill
  yourself before bootstrapping the component.

---

## 1.1.4 → 1.1.5

- **`rv-class` was renamed to `rv-add-class`** (the binder that *adds* a class
  string while preserving existing classes). Replace all occurrences:

  ```html
  <!-- before -->
  <div rv-class="extraClass">…</div>
  <!-- after -->
  <div rv-add-class="extraClass">…</div>
  ```

  Note: `rv-class-*` (the star binder that toggles a single class on a boolean)
  was **not** renamed and continues to work.

---

## 1.0.x → 1.1.0

- **Binders and formatters must be objects.** The "binder/formatter as a plain
  function" shorthand was removed. Wrap existing function-style binders in an
  object with a `routine` method.

---

## 0.16.x → 1.0.0

- **Rivets.js components feature removed.** Use `RibaComponent` /
  `BasicComponent` (Custom Elements v1) instead.
- **One-way binder as function removed.** One-way binders must define a
  `routine` method.
- **Binders must declare their own `name` property.**
- **`css-*` binder renamed to `style-*`.** Update all templates:

  ```html
  <!-- before -->
  <div rv-css-color="model.color"></div>
  <!-- after -->
  <div rv-style-color="model.color"></div>
  ```

- Test framework moved from Mocha to Jest (affects contributors, not
  consumers).

---

## 0.15.x → 0.16.x

- Project renamed to **Riba** (Rivets.js + barba.js).
- Core, router, and Shopify extension moved to **separate packages** under
  `@ribajs/*`. Update imports accordingly.

---

## 0.12.x → 0.13.0

- **Rewritten in TypeScript.** Types now ship with the package; delete any
  hand-rolled `rivets.d.ts` shims.

---

## 0.6.x → 0.7.0

- **`rivets.config` is gone.** Configuration options are defined directly on
  the module:

  ```js
  // before
  rivets.config.templateDelimiters = ['{{', '}}'];
  // after
  rivets.templateDelimiters = ['{{', '}}'];
  ```

  `rivets.configure({})` still works as before.

- **Formatter arguments must be wrapped in quotes.** Arguments are evaluated
  as keypaths by default:

  ```html
  <!-- before -->
  <p>{ item.enabled | switch green red }</p>
  <!-- after -->
  <p>{ item.enabled | switch 'green' 'red' }</p>
  ```

  Unquoted numbers, `true`, `false`, `null`, `undefined` stay as primitives.

- **Custom adapter method renames:**
  - `adapter.subscribe` → `adapter.observe`
  - `adapter.unsubscribe` → `adapter.unobserve`
  - `adapter.read` → `adapter.get`
  - `adapter.publish` → `adapter.set`

- Include the **Sightglass** lib (`sightglass.js`) before `rivets.js`, or use
  the bundled `rivets.bundled.min.js`.

- The built-in `value` binder now listens on `input` instead of `change`
  (updates propagate immediately instead of on blur).

- `<script>` elements inside templates are ignored.

---

## 0.5.x → 0.6.0

- **Dependencies now stem from the target object**, not the view's scope
  object. Update dependency keypaths so they start from the object that holds
  the computed property/function.
- **`prefix` config is now absolute.** Include `"data"` in the prefix if you
  want data attributes. Default is `rv`, so legacy `data-rv-*` attributes
  become `rv-*`. Either rename all attributes or set
  `rivets.prefix = 'data-rv'`.

### Caveats of the built-in adapter

- Observes array mutations (`push`, `pop`, `unshift`, etc.) but **not**
  assignments to indexes (`array[3] = 'world'`).
- Cannot subscribe to an array's `length` property. Use a formatter
  (`list.items | size`) to access length reactively.
