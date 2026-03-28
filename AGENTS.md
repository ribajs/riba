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

Syntax: `rv-[binder]="keypath | formatter | formatter('arg')"` + `{{ expr }}` mustache in text nodes
Priority: higher=first | Block binders (rv-if,rv-each-*) prevent child parsing | Star binders: wildcard params

rv-text|textContent | rv-html|innerHTML | rv-value|two-way input | rv-if|conditional block | rv-show|display toggle
rv-each-*|iterate arrays/objects | rv-on-*|event listeners | rv-class-*|toggle CSS class | rv-style-*|inline CSS
rv-checked,rv-disabled,rv-enabled|form states | rv-template|dynamic HTML+rebind | rv-assign|merge obj into model

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

## Commands

yarn install | yarn build:all | yarn build:libs | yarn test | yarn test:watch | yarn lint | yarn clean | yarn check:all
Per-package: cd packages/<pkg> && yarn build

## Conventions

Files: {name}.component.ts | {name}.binder.ts | {name}.formatter.ts
Exports: src/index.ts per package | tagName: kebab-case (e.g. "bs5-accordion")
Stack: TS strict + ESM | Vitest + jsdom | ESLint + Prettier | JSX templates via @ribajs/jsx | SCSS (BS5 conventions)
Tests: __tests__/*.spec.ts or *.spec.ts

## Security

rv-html with user content = XSS risk | PJAX: same-origin only | scope objects reactive — don't expose secrets
