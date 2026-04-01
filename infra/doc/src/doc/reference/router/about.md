The router module turns multi-page websites into fluid PJAX applications while
keeping server-rendered HTML as the source of truth.

It is inspired by [Barba.js](https://barba.js.org), but implemented and adapted
for Riba.js modules, binders, and component lifecycle.

## Why use `@ribajs/router`?

- Smooth page transitions without full page reload.
- Lower network overhead with cache and prefetch.
- Works with CMS outputs (WordPress, OctoberCMS, Shopify, static builds).
- Progressive enhancement friendly: pages still work without JavaScript.
- Keeps your app architecture close to regular multi-page websites.

## How it works

When the user clicks an eligible link:

1. The click is intercepted (either globally or via `rv-route`).
2. URL state is updated with the History API.
3. The next page HTML is fetched (or loaded from cache).
4. The target container is parsed and appended into `router-view`.
5. A transition is resolved and executed.
6. The old container is removed and the new one stays visible.
7. Router events and hooks are emitted for app code.

For a complete event and lifecycle breakdown see `Router Lifecycle` and
`Router Hooks` pages.

## Credits

The transition API and documentation structure are inspired by Barba.js
([MIT License](https://github.com/barbajs/barba/blob/main/LICENSE.md))
by Luigi De Rosa and Thierry Michel.
