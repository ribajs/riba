# Migration Guide

Upgrade notes for breaking changes across major Riba.js releases. For the full
per-version change log, see [CHANGELOG.md](./CHANGELOG.md).

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
