# Riba.js

Riba.js is a fork of Rivets.js, a lightweight data binding and templating system that facilitates building data-driven views. It is agnostic about every aspect of a front-end MV(C|VM|P) stack, making it easy to introduce it into your current workflow or to use it as part of your own custom front-end stack comprised of other libraries.

## Documentation

You found the documentation source files on [github.com/ribajs/doc](https://github.com/ribajs/doc) or rendered on [ribajs.com](https://ribajs.com/).

## Yarn

We are using yarn to build and release Riba, so to test the demos please use yarn instead of npm.

## Demos

For the different modules there are some demos, to start one of the demos go into the directory and execute it with `yarn run start`: 

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
cd riba/demos/core-each-item # replace core-each-item with a demo of your choice
yarn run start
```

## Examples

There are a few Riba projects you can take a look at:

### OctoberCMS v1.x

There are a few OctoberCMS v1.x themes which were developed using Riba:

* [Strandhus OctoberCMS Theme](https://github.com/ArtCodeStudio/strandhus-october-theme)
* [Hypnose OctoberCMS Theme](https://github.com/ArtCodeStudio/hypnose-october-theme)

### Shopify Themes

* The [Riba Documentation Theme](https://github.com/ribajs/doc) is currently implemented as Shopify Theme.
* The [Seeberger Shop](https://www.seeberger.de/) was developed using Riba.js as a Shopify Theme.

### Node.js

* The [Gymnasium Otterndorf Website](https://github.com/ArtCodeStudio/gymnasium-otterndorf-website) was developed using Riba.js, Nest.js and Strapi. Riba.js is also used for the templates on the server side, and the custom elements are delivered with server side rendering (SSR).
* The [ParcelLab Shopify App](https://github.com/ArtCodeStudio/parcel-lab-shopify-app) is a small Shopify App and the dashboard / fronted is build with Riba.js.

### Deno

* The [website of markusmorische.de](https://github.com/ArtCodeStudio/markus-morische-rechtsanwalt-website) is build using Deno, Alosaur, Riba.js and Strapi. 
## Contributing

### Clone

This branch contains submodules, to check out this repository with it submodules use the `--recurse-submodules` option:

```bash
git clone --recurse-submodules https://github.com/ribajs/riba.git
```

If you have already cloned this repository, you can also check out the submodules afterwards:

```bash
git submodule update --init --recursive --rebase --force
```

### Bug Reporting

1. Ensure the bug can be reproduced on the latest master.
2. (optional) Submit a new demo oriented on the existing demos to illustrate the problem

### Pull Requests

1. Fork the repository and create a topic branch.
2. Include tests that cover any changes or additions that you've made.
3. Push your topic branch to your fork and submit a pull request. Include details about the changes as well as a reference to related issue(s).
