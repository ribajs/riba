Router performance and stability rely on a few core strategies.

## Cache

`Pjax.cache` stores fetched page responses as promises to avoid duplicate
requests for previously visited links.

## Prefetch

- Global prefetch can be enabled with `prefetchLinks`.
- You can prefetch a specific route with `rv-route-preload`.
- Prefetch is skipped for links marked with ignore classes.

## Prevent rules

Links are ignored when they:

- point to external origins
- use `_blank`
- have `download`
- include `no-router` (legacy alias: `no-barba`)

## History

`HistoryManager` tracks `currentStatus` and `prevStatus` with URL and namespace.
This is used by events and transition matching.
