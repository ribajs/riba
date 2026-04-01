The minimum structure is a `router-view` wrapper with a page container child.

```html
<router-view>
  <main data-namespace="home">
    <h1>Home</h1>
  </main>
</router-view>
```

`router-view` keeps layout-level elements stable while replacing its content
container between navigations.

## Basic transition example

```ts
import { routerModule } from "@ribajs/router";

routerModule.init({
  transitions: [
    {
      name: "basic-fade",
      leave: ({ current }) =>
        current.container?.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 220, fill: "forwards" },
        ).finished,
      enter: ({ next }) =>
        next.container?.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 220, fill: "forwards" },
        ).finished,
    },
  ],
});
```

For rule-based transitions (`from` / `to`, `sync`, `once`) continue with
the `Router Transitions` page.
