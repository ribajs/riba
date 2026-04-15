# AGENTS.md — Riba.js

Prefer retrieval-led reasoning over pre-training-led reasoning when referencing this codebase.

## Project

Riba.js: TS declarative data-binding + Web Components v1 framework (evolved from Rivets.js/tinybind)
Repo: github.com/ribajs/riba | License: MIT | Author: Art+Code Studio (Pascal Garber)
Lang: TypeScript, ESM-only | Node: >=24 | Pkg mgr: Yarn Berry/v4, PnP mode

## Structure

```
packages/*   @ribajs/* (npm) | core,router,bs5,i18n,extras,utils,jsx,events,history,cache,...
infra/*      internal tooling | {vite-config,tsconfig,eslint-config,postcss-config,types,doc,npm-package}
demos/*      demo apps | backend/* | examples/*/*
```

## Key Files

```
packages/core/src/{riba,view,binder,observer,parse-node}.ts
packages/core/src/component/{component,basic-component}.ts
packages/core/src/services/{module,lifecycle}.service.ts
packages/core/src/adapters/dot.adapter.ts
packages/router/src/services/Pjax/index.ts
packages/router/src/components/view/view.component.ts
```

## Architecture

Riba(singleton) -> module.register(module) -> riba.bind(el, model) -> View(parses DOM) -> Binder instances <- Observer(watches model via DotAdapter/Object.defineProperty) -> DOM updates

## Components

Hierarchy: HTMLElement <- BasicComponent(lifecycle, attrs) <- Component(+Riba view binding)
Lifecycle: constructor->connectedCallback->init->attributeChangedCallback->bindIfReady->beforeTemplate->loadTemplate->afterTemplate->bind->beforeBind->afterBind->afterAllBind
Props: `static tagName` (kebab-case) | `static observedAttributes` | `scope` (viewmodel) | `template()` returns JSX|null

## Binders

Syntax: `rv-[binder]="keypath | formatter | formatter('arg')"` + `{ expr }` mustache in text nodes (default delimiters `{` / `}`, not Liquid `{{` / `}}`)
Priority: higher=first | Block binders (rv-if,rv-each-*) prevent child parsing | Star binders: wildcard params

rv-text|textContent | rv-html|innerHTML | rv-value|two-way input | rv-if|conditional block | rv-show|display toggle
rv-each-*|iterate arrays/objects | rv-on-*|event listeners | rv-class-*|toggle CSS class | rv-style-*|inline CSS
rv-checked,rv-disabled,rv-enabled|form states | rv-template|dynamic HTML+rebind | rv-assign|merge obj into model
rv-add-class|add class string to element | rv-remove-class|remove class string from element

### rv-class vs rv-add-class — NO rv-class BINDER EXISTS

There is **no `rv-class` binder** in Riba. Only these class-related binders exist:
- `rv-class-*` (star binder) — toggles a single CSS class based on a boolean: `rv-class-active="item.active"`
- `rv-add-class` — adds class(es) from a string value while **preserving** static classes from the `class` attribute
- `rv-remove-class` — removes a class string

If you write `rv-class="someClassString"`, it falls through to the **generic attribute binder** which does `setAttribute("class", value)` — this **overwrites** the entire `class` attribute, destroying all static Tailwind classes.

```html
<!-- BAD: rv-class overwrites static classes — bg-gray-200, rounded-full etc. are lost -->
<div class="rounded-full bg-gray-200" rv-class="sizeClass"></div>

<!-- GOOD: rv-add-class preserves static classes -->
<div class="rounded-full bg-gray-200" rv-add-class="sizeClass"></div>
```

### rv-if/rv-unless inside rv-each — KNOWN BUG

`rv-if`/`rv-unless` are block binders that remove/insert DOM nodes. Inside `rv-each-*` child views, they do not reactively update when the iterated object's properties change. The initial render works, but subsequent property mutations are ignored.

The problem is that `rv-if` removes the element it's placed on. When the rv-each child view tries to update, the element is gone.

**Two workarounds:**

**1. Use `rv-show`/`rv-hide` (preferred for simple cases)**
```html
<!-- BAD -->
<div rv-each-item="items">
  <span rv-if="item.active">Active</span>
</div>

<!-- GOOD: rv-show toggles display:none, element stays in DOM -->
<div rv-each-item="items">
  <span rv-show="item.active">Active</span>
</div>
```
`rv-unless` → use `rv-hide`. For toggling between two elements, use `rv-show` on one and `rv-hide` on the other. Also works: `rv-class-*` to toggle CSS classes.

**2. Wrap in a child element (when rv-if is needed)**
```html
<!-- BAD: rv-if on the rv-each element's direct content -->
<li rv-each-item="items">
  <a rv-if="item.href" rv-href="item.href">Link</a>
</li>

<!-- GOOD: rv-if on a wrapper child — the wrapper gets removed but the li stays -->
<li rv-each-item="items">
  <div rv-if="item.href">
    <a rv-href="item.href">Link</a>
  </div>
</li>
```

Duplicate `rv-class` attributes on the same element are also invalid (HTML drops the second). Use a single computed class string or separate `rv-class-*` toggles.

## Formatters

Pipe syntax: `value | fmt1 | fmt2 'arg'` — support two-way via read()/publish()

str: upcase,downcase,capitalize,append,prepend,slice,replace,strip,strip-html,handleize,cut,pluralize,number-format,filled
arr: join,first,last,size,empty,contains,set,get,range,random
cmp: eq,ne,gt,lt,egt,elt,and,or,not,between
math: plus,minus,times,divided-by,modulo,even,uneven,digits
type: to-string,to-number,to-integer,to-float,to-decimal,to-base64,boolean,json,parse,is-{string,number,defined,undefined}
special: call,args,default,ternary,map,debug

## Router

PJAX-based SPA: `<router-view>` component + Pjax service (intercept clicks, AJAX load, swap content, update history)
Transitions: HideShowTransition,FadeTransition,CustomTransition (packages/router/src/services/Transition/)
Binders: rv-route,rv-route-class-*,rv-route-preload,rv-route-back-on-*

## Modules

```typescript
const mod: RibaModule = { binders:{}, components:{}, formatters:{}, init(opts){ return this; } };
riba.module.register(mod);
```
Key: coreModule,routerModule,bs5Module,i18nModule,extrasModule

## Lifecycle Service

LifecycleService(singleton) tracks component binding state
Events: Component:{constructor,connected,beforeBind,afterBind,disconnected} | ComponentLifecycle:allBound

## Testing

Tests define how the API **should** behave, not how it **currently** behaves. They serve two purposes:
1. **Bug detection** — a failing test means the implementation is wrong, not the test
2. **API documentation** — tests describe the intended contract for consumers

When a test fails, fix the implementation first. Only adjust the test if the original expectation was based on a misunderstanding of the API's purpose. Never silently adapt tests to match buggy behavior.

Unit: Vitest + jsdom (`yarn test`) | E2E: Playwright + Chromium (`yarn test:e2e`)

## Commands

yarn install | yarn build | yarn build:libs | yarn test | yarn test:watch | yarn test:e2e | yarn test:e2e:ui | yarn format | yarn clean | yarn check:all
Per-package: cd packages/<pkg> && yarn build

## Conventions

Files: {name}.component.ts | {name}.binder.ts | {name}.formatter.ts
Exports: src/index.ts per package | tagName: kebab-case (e.g. "bs5-accordion")
Stack: TS strict + ESM | Vitest + jsdom | ESLint + Prettier | JSX templates via @ribajs/jsx | SCSS (BS5 conventions)
Tests: __tests__/*.spec.ts or *.spec.ts

## Security

rv-html with user content = XSS risk | PJAX: same-origin only | scope objects reactive — don't expose secrets
