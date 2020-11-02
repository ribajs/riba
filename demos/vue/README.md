# riba vue mix demo

This demo demonstrates how you can use Vue.js in Riba.
Yes you heard right, it is possible to use Vue.js within Riba.js.

## How it works

The [vue-app](https://github.com/ribajs/riba/tree/master/demos/vue/src/ts/components/vue-app) component creates a Vue app, inside this component (which is a custom element) you can use all the Vue.js features you love. It is also possible to have multiple components like this. Outside of this component you can use Riba.js.

### Components in this demo

* [vue-example-wrapper](https://github.com/ribajs/riba/tree/master/demos/vue/src/ts/components/vue-example-wrapper) - Just a wrapper, so we can easily include the demo in the documentation
* [riba-increase](https://github.com/ribajs/riba/tree/master/demos/vue/src/ts/components/riba-increase) - A simple Riba.js component where you can increase a number with one click
* [vue-app](https://github.com/ribajs/riba/tree/master/demos/vue/src/ts/components/vue-app) - The Vue.js App, root element of the Vue.js app, in here you can use any Vue.js functionality
* [vue-increase](https://github.com/ribajs/riba/tree/master/demos/vue/src/ts/components/vue-increase) - Same functionality as the riba-increase component but written with Vue.js

## Try it out

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
cd riba/demos/vue
yarn install
yarn run start
```
