# Changelog

## Dev

- Switched from npm to yarn 2
- Switched from webpack 4 to webpack 5

### Core

- New parent binder to bind the parent scope to any custom element / web component
- New component attribute binder to bind an attribute passed with rv-co-* to any custom element / web component without first converting it as an attribute
- New flex-sort-childs binder

### Breaking changes

- If you call a function from you template the first argument is not any more the binder:

before:

```ts
public toggle(context?: Binder<any>, event?: Event) {
```

after:

```ts
public toggle(event?: Event) {
```

### BS4

- Renamed aspect ratio classnames to the existing bootstrap ratio classnames
  - To migrate do rename the classes from to:
    - **Background based**
      - `.background-box` -> `.embed-responsive-bg`
      - `.ratio-[breakpoint]-[aspect-ratio-x]-[aspect-ratio-y]` -> `.embed-responsive-bg-[breakpoint]-[aspect-ratio-x]by[aspect-ratio-y]` (e.g. `.ratio-md-4-3` -> `.embed-responsive-bg-md-4by3`)
     **Object based**
      - `.content-box` -> `.embed-responsive`
      - `.content` -> `.embed-responsive-item`
      - `.ratio-[breakpoint]-[aspect-ratio-x]-[aspect-ratio-y]` with `.embed-responsive-[breakpoint]-[aspect-ratio-x]-[aspect-ratio-y]` (e.g. `.ratio-md-4-3` -> `.embed-responsive-md-4by3`)
    - And you should set the scss variable `$embed-responsive-aspect-ratios` to: `$embed-responsive-aspect-ratios: ((1 1),(3 2),(2 3),(2 1),(1 2),(4 3),(3 4),(16 9),(9 16),(10 3),(3 10),(17 10),(10 17),(14 9),(9 14),(21 9),(9 21));` to have all supported aspect ratios from before.
- New bs4-carousel component
- New bs4-toggle-attribute binder
- New bs4-toggle-class binder
- New bs4-toggle-collapse-on-* binder

### Photoswipe

- New Photoswipe module

## 1.8.0

- Upgrade dependencies
- Moved from corejs@2 to corejs@3
- Moved from tslint to eslint
- New demos

### Core

- New data-passive attribute for on-event binder

### Extras

- New scroll-events service and binder
- New touch-events service and binder
- New autoscroll service
- New gameloop service
- New dragscroll service (scrollbar-draggable)
- New data-scroll-position-y binder

### BS4

- New bs4-slideshow component
- bs4-tabs component improvments
  - now, triggers a `visibility-changed` event on the first tab content element to react in components when they become visible
  - Support for vertical tabs
- New bs4-accordion component
- New bs4-button component
- Improved bs4-icon component
- Improved bs4-sidebar component
- Additional styles and existing style improvments

### Router

- Cache container instead of full http request result
- Initial support for prefetch links
- Speed improvements

## 1.7.0

- Upgrade dependencies

### BS4

- Removed jQuery dependency
- Add Bs4 prefix to components and binders
- Some bugfixes

### CLI

- Fix issue #4

## 1.6.1

### Core

- Moved http methods from Utils to HttpService
- Bugfixes

### Shopify

- Fix ShopifyCartService requests

## 1.6.0

- Removed `I` prefix from interface names

## I18n

- Added locale switcher component
- Added new static locales example

## 1.5.0

### Core

- Removed jQuery dependency
- Removed Debug dependency
- bugfixes

### Router

- Removed jQuery dependency
- Removed Debug dependency

### JQuery

- New jQuery Module

### Iconset

- Fix sizes in some icons
- Allow multiple colors in bs4-icon binder

## 1.4.0

### Core

- Add support for attributes with (normally invalid) single qoute json strings

### Shopify

- New ShopifyLinklistComponent
- New Shopify snippet templates

### BS4

- New Bs4SidebarComponent
- New Bs4ToggleButtonComponent

### Router

- New option to not update the browser url

## 1.3.0

### Core

- Fix component callFormatterHandler
- Add new VideoComponent
- new Riba component check if all passed attributes are initialized before Riba is bind in this component, this fixes a bug with multiple execution of the bind method

### Iconset

- Add new iconset package

### Shopify

- New shopify-img binder

### BS4

- Add style extensions
- New `scroll-to-on-*` binder
- New Bs4ScrollspyComponent
- New Bs4ContentsComponent
- New Bs4IconComponent

### Examples

- Add new bs4-tabs component example

## 1.2.1

### Core

- Cleanups
- New `srcset-*` binder

### BS4

- Improve tabs component

## 1.2.0

- Upgrade dependencies
- Fix args component formatter

### Shopify

- Fix formatters

### i18n

- Fix module exports
- new option to disable "missing translation" messages

## 1.1.5

- Upgrade Dependencies
- Portend unless binder from Rivets.js to Riba.js
- Portend unchecked binder from Rivets.js to Riba.js
- Renamed add class binder attribute from `rv-class` to `rv-add-class`
- Added new assign-property binder

## 1.1.3

- New option `blockNodeNames` to define that should be ignored

## 1.1.1

- Fixed small spelling mistake

## 1.1.0

- Add cli tool to generate new riba frontend projects and create new binders, formaters and components to the project
- Add schematics to generate project templates (used by the cli tool)
- Binder and formatters must now be an object (Removed binder / formatter as a function feature)

## 1.0.1

- Changed Binder and Formatter interface to allow any other properties or methods on it.

## 1.0.0

- Moved tests from mocha to jest
- Removed Rivets.js components feature (we have RibaComponents based on Custom Elements)
- Binders: Remove One-Way-Binder as function feature (Also One-Way-Binders are needing the `routine` method now)
- Simplified binders interface
- Binders now need their own name as a property
- Renamed `css-*` binder to `style-`
- Added ModuleServer to regist modules

## 0.16.2

- Renamed to Riba (Rivets.js + barba.js)
- Moved the core, the router and the shopify extension to seperate packages
- New Binders
- Bugfixes

## 0.15.0

- Tow-Way-Databinding in components by calling the publish method
- Support formatters only on primitive arguments
- New router binders based on [barba.js](https://github.com/luruke/barba.js)
  - View binder to load new content with pjax
  - Route binder to start loading content for the view
- Many new formatters
- Code changes and cleanups

## 0.14.0

- Support formatters on component arguments

## 0.13.0

- Rewritten in TypeScript
- Simplified components

## 0.12.0

- Components feature restored from Rivets.js
- Updated developer dependencies
- Replaced mocha-phantomjs with mocha-chrome for local tests
- Support json strings in attributes
- Cleanups
- Bugfixes

## 0.11.0 and before

- Changes from the Rivets.js fork called [riba](https://github.com/blikblum/riba)

## 0.8.0

- More refined and useful components API. Some documentation is available [here](http://rivetsjs.com/docs/guide/#components).

## 0.7.0

- Support for data-bound keypaths are formatter arguments.

  ```json
  { item.price | lte user.balance }
  ```

- Support for primitives in binding declarations. This includes strings, numbers, booleans, null and undefined.

  ```json
  { item.updated | date 'MMM DD, YYY' }
  ```

- Primitives are also supported as the binding target.

  ```json
  { 'i18n.errors.' | append error | translate }
  ```

- Support for multiple binder arguments (wildcard matches). See [#383](https://github.com/mikeric/rivets/pull/383).

- The `Observer` class has been abstracted out into a new lib as a dependency. See [Sightglass](https://github.com/mikeric/sightglass).

- The built-in `value` binder now listens on the `input` event instead of `change`, so updates will propogate immediately instead of on blur.

- There is no more `rivets.config` object. All of the previous configuration options are defined on the module directly.

- If a template includes `<script>` elements, they will now be ignored when the template is parsed.

### Upgrading from 0.6.0

- Make sure you include the sightglass lib in your project. Just include `sightglass.js` before `rivets.js`. Alternatively you can just include `rivets.bundled.min.js` once (contains both libraries).

- If you have defined any custom adapters, they will need to be updated from the old property names to the new property names.

- `adapter.subscribe` is now `adapter.observe`.
- `adapter.unsubscribe` is now `adapter.unobserve`.
- `adapter.read` is now `adapter.get`.
- `adapter.publish` is now `adapter.set`.

- Change all of your existing formatter arguments to be wrapped in quotes. This is because arguments are evaluated as keypaths by default (unless they are wrapped in quotes).

  - For example, if you were previously doing the following:

    ```html
    <p>{ item.enabled | switch green red }</p>
    ```

    You will need to change it to:

    ```html
    <p>{ item.enabled | switch 'green' 'red' }</p>
    ```

    - Note that if your keypath argument was a number, `true`, `false`, `null` or `undefined`, then you can leave them without quotes, but they will be passed to the formatter as the actual primitive value instead of a string.

- If you ever set properties directly on the `rivets.config` object, you will need to change those to the `rivets` object itself.

  - For example, if you were previously doing the following:

      ```javascript
      rivets.config.templateDelimiters = ['{{', '}}']
      ```

      You will need to change it to:

      ```javascript
      rivets.templateDelimiters = ['{{', '}}']
      ```

  - Note that if you were only using `rivets.configure({})` then no changes are needed (`rivets.configure` functions the same as before).

## v0.6.0

- Support for multiple adapters through interfaces.
- Ships with a built-in `.` adapter using ES5 natives (getters and setters).
- Support for nested keypaths (`user.address:zip`).

### Upgrading from 0.5

- All dependencies now stem from the target object, not the view's scope object. Make sure to change all dependency keypaths so that they stem from the object that points to the computed property / function.
- The `prefix` configuration is now an absolute prefix (you need to include "data" in the prefix if you want to use data attributes). Defaults to `rv`. Make sure to change all existing attribute names to `rv-[binder]` or update your `prefix` configuration option.

### Caveats

- The built-in adapter observes array mutations (push, pop, unshift, etc.) but not changes made to indexes on the array directly (`array[3] = 'world'` for example).
- The built-in adapter cannot subscribe to an array's `length` property. Currently you need to use a formatter to access the array's `length` property (`list.items | length`).
