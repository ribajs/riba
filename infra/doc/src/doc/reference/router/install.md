```bash
npm install --save @ribajs/router
```

## Register module

Register the router module next to your core module:

```ts
import { Riba, coreModule } from "@ribajs/core";
import { routerModule } from "@ribajs/router";

const riba = new Riba();
const model = {};

riba.module.register(coreModule.init());
riba.module.register(routerModule.init());

riba.bind(document.body, model);
```

## Configure transitions (optional)

You can keep the default transition or provide declarative transitions:

```ts
riba.module.register(
  routerModule.init({
    transitions: [
      {
        name: "fade",
        leave: ({ current }) => {
          current.container?.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 200, fill: "forwards" },
          ).finished;
        },
        enter: ({ next }) => {
          next.container?.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 200, fill: "forwards" },
          ).finished;
        },
      },
    ],
  }),
);
```

## Required markup

```html
<router-view id="main">
  <main data-namespace="home">
    <!-- content swapped by router -->
  </main>
</router-view>
```

Use unique `data-namespace` values per page whenever possible. They are used for
transition rules and hooks.
