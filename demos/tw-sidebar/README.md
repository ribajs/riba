# tw-sidebar Demo

Builds a dashboard layout from three `tw-sidebar` instances that differ in their `position` and `mode`: a left and a right panel in `overlap` mode, which float above the content behind a dark backdrop, and a left panel in `side` mode, which pushes the main content aside instead. Each trigger is a `tw-toggle-button` with a `target-id` pointing at the sidebar and a nested button bound with the `rv-on-click` binder, and the main area is laid out with `tw-card`.

## Getting started

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
cd riba/demos/tw-sidebar
yarn install
yarn start
```
