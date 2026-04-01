`@ribajs/router` supports declarative transitions with rule-based selection.

For nested demos inside this documentation, links are routed with `rv-route` and an
explicit `viewId` so navigation stays inside the embedded `router-view` instead of
the global docs view.

## Syntax

```ts
routerModule.init({
  transitions: [
    {
      name: "default",
      leave: ({ current }) => animateOut(current.container),
      enter: ({ next }) => animateIn(next.container),
    },
  ],
});
```

## Rules

Transitions can use `from` and/or `to`:

```ts
{
  name: "home-to-detail",
  from: { namespace: "home" },
  to: { namespace: "detail" },
  leave: ({ current }) => animateOut(current.container),
  enter: ({ next }) => animateIn(next.container),
}
```

### Condition keys

- `namespace: string | string[]`
- `route: string | string[]`
- `custom: (data) => boolean`

### Resolution priority

1. Explicit `priority` value (highest first)
2. Rule specificity (`from+to` > `to` > `from`)
3. Condition specificity (`custom` > `route` > `namespace`)
4. Declaration order

## Sync mode

Enable with `sync: true` when leave and enter should run together:

```ts
{
  sync: true,
  leave: ({ current }) => fadeOut(current.container),
  enter: ({ next }) => fadeIn(next.container),
}
```

## Once transitions

Run code only on first load:

```ts
{
  name: "home-once",
  to: { namespace: "home" },
  once: ({ next }) => introReveal(next.container),
}
```

## Compatibility wrappers

Class-based transitions still work and can be wrapped:

```ts
import { FadeTransition } from "@ribajs/router";

routerModule.init({
  transitions: [FadeTransition.asDefinition()],
});
```

## Creative examples

### Slide transition demo

Credits:

- Inspired by Thierry Michel's Barba.js example:
  https://codepen.io/thierrymichel/project/editor/XkkWWv

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs
      class="pt-3"
      handle="router-slide-demo"
      demo-url="router-demo-slide.html"
      standalone-url="router-demo-slide.html"
    >
      <template
        type="demo"
        title="Live Demo"
        demo-url="router-demo-slide.html"
        standalone-url="router-demo-slide.html"
        container-selector="router-view#demo-slide-view"
      >
        <div
          rv-view-static="{'url': 'router-demo-slide.html', 'containerSelector': 'router-view#demo-slide-view'}"
        ></div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>

### SVG transition demo

Credits:

- Inspired by Thierry Michel's Barba.js example:
  https://codepen.io/thierrymichel/project/editor/ZrzBBK

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs
      class="pt-3"
      handle="router-svg-demo"
      demo-url="router-demo-svg.html"
      standalone-url="router-demo-svg.html"
    >
      <template
        type="demo"
        title="Live Demo"
        demo-url="router-demo-svg.html"
        standalone-url="router-demo-svg.html"
        container-selector="router-view#demo-svg-view"
      >
        <div
          rv-view-static="{'url': 'router-demo-svg.html', 'containerSelector': 'router-view#demo-svg-view'}"
        ></div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
