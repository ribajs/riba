# tw-notifications Demo

Demonstrates `tw-notification-container`, which listens on the channel named by `channel-name` and renders every `show-notification` event it receives, stacking toasts of each type in the corner and showing a modal dialog with a backdrop. Buttons bound with the `rv-on-click` binder dispatch those events through an `EventDispatcher` from `@ribajs/events`, with `kind` and `type` set per notification, while one error toast is kept on screen with `timeout: 0`; static inline variants of `tw-alert` close the page.

## Getting started

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
cd riba/demos/tw-notifications
yarn install
yarn start
```
