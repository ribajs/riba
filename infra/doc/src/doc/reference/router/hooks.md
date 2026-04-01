Hooks let you run code at precise lifecycle points.

## Base hooks

| Order | Hook | Description |
| --- | --- | --- |
| 1 | `beforeOnce` | Before first-load transition |
| 2 | `once` | First-load transition |
| 3 | `afterOnce` | After first-load transition |
| 4 | `before` | Before page transition |
| 5 | `beforeLeave` | Before leave animation |
| 6 | `leave` | Leave animation |
| 7 | `afterLeave` | After leave animation |
| 8 | `beforeEnter` | Before enter animation |
| 9 | `enter` | Enter animation |
| 10 | `afterEnter` | After enter animation |
| 11 | `after` | Final hook after cleanup |

## Global hooks

Register globally via `routerHooks`:

```ts
import { routerHooks } from "@ribajs/router";

routerHooks.before((data) => {
  console.log("Transition start", data.current.url.href, data.next.url.href);
});
```

## Hook data argument

Every hook receives `TransitionData`:

```ts
type TransitionData = {
  current: {
    container?: HTMLElement;
    namespace?: string | null;
    route?: { name?: string };
    url: { href: string; path: string; hash: string; query: Record<string, string | string[]> };
    html?: string;
  };
  next: { ...same shape... };
  trigger?: HTMLAnchorElement | "popstate" | "barba" | string;
  event?: Event;
};
```

## Per-transition hooks

Each transition definition can include its own hooks:

```ts
{
  before: (data) => console.log("before", data),
  leave: ({ current }) => animateOut(current.container),
  enter: ({ next }) => animateIn(next.container),
  after: () => console.log("done"),
}
```
