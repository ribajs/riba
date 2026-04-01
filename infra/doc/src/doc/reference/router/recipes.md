Practical patterns for production router usage.

## Containers in sync mode

When using `sync: true`, old and new containers are visible at the same time.
Use positioning (`absolute` / stacking contexts) to avoid layout jumps.

## Scroll position

- Use `scrollToTop` for simple reset behavior.
- Use `scrollToAnchorHash` and `scrollToAnchorOffset` for hash routes.
- For custom behavior, set `history.scrollRestoration = "manual"` in app setup.

## Debugging transitions

Attach global hooks for temporary logging:

```ts
routerHooks.before((data) => console.debug("before", data));
routerHooks.after((data) => console.debug("after", data));
```

## Reinitializing third-party scripts

Run script setup after navigation:

```ts
import { EventDispatcher } from "@ribajs/events";

const dispatcher = new EventDispatcher("main");
dispatcher.on("newPageReady", () => {
  // Re-run third party setup here
});
```

## CMS output compatibility

Router works well with multi-page CMS output because it consumes HTML responses
and swaps containers without requiring a full SPA backend.
