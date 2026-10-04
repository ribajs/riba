# tw-tabs Demo

Demonstrates the `tw-tabs` component, whose panels are declared as `<template>` children carrying a `title` attribute, together with the `tw-steps` wizard in its `horizontal` and `vertical` orientation, whose steps likewise come from `<template>` children with `title` and `description`. Both work from those templates alone – no extra binder markup is needed, a step circle is clicked to navigate to it and passed steps show a checkmark.

## Getting started

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
cd riba/demos/tw-tabs
yarn install
yarn start
```
