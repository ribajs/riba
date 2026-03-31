When writing custom formatters, Riba now passes an optional **formatter context** as the last argument.

The context is useful for formatters that depend on external state (events, locale, media query, time):

- `invalidate()` reruns the current binding (`sync`) without changing the observed keypath.
- `addCleanup(fn, key?)` registers cleanup logic that runs automatically on unbind.
- `on(target, eventName, callback, key?)` subscribes and auto-unsubscribes on unbind.

```typescript
const clockFormatter = {
  name: "clock",
  read(value: string, context?: any) {
    if (context) {
      context.on(windowClockBus, "tick", () => context.invalidate(), "tick");
    }
    return `${value} @ ${new Date().toISOString()}`;
  },
};
```

Notes:

- Existing formatters still work unchanged; the context argument is optional.
- Prefer stable keys for long-lived subscriptions (`"tick"`, `"changed"`, ...).
- Cleanup is binding-scoped, so subscriptions are disposed when the view unbinds.
