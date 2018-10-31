# riba

riba is the espiritual sucessor of Rivets.js, a lightweight data binding and templating system that facilitates building data-driven views. It is agnostic about every aspect of a front-end MV(C|VM|P) stack, making it easy to introduce it into your current workflow or to use it as part of your own custom front-end stack comprised of other libraries.

## Install

```bash
npm install JumpLinkNetwork/riba
```

### JavaScript

Use in a script tag...

```html
<script src="node_modules/riba/dist/riba.min.js"></script>
```

... or import using a bundler like webpack

```javascript
import riba from 'riba'
```

#### Usage

```html
<section id="auction">
  <h3>{ auction.product.name }</h3>
  <p>Current bid: { auction.currentBid | money }</p>

  <aside rv-if="auction.timeLeft | lt 120">
    Hurry up! There is { auction.timeLeft | time } left.
  </aside>
</section>
```

```javascript
riba.bind($('#auction')[0], {auction: auction});
```

### TypeScript

```typescript
import JQuery from 'jquery';

import {
  Riba,
  View,

  // default binders
  routerBinders,
  basicBinders,

  // default formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,
} from 'riba';

export class Main {

  private view: View;
  private riba = new Riba();
  private model: any = {};

  constructor() {

    // regist binders
    this.riba.binderService.regists(routerBinders);
    this.riba.binderService.regists(basicBinders);

    // regist formatters
    this.riba.formatterService.regists(compareFormatters);
    this.riba.formatterService.regists(mathFormatters);
    this.riba.formatterService.regists(propertyFormatters);
    this.riba.formatterService.regists(specialFormatters);
    this.riba.formatterService.regists(stringFormatters);

    this.view = this.riba.bind(JQuery('body')[0], this.model);

  }
}

JQuery(() => {
  const main = new Main();
});
```

## Getting Started and Documentation

Documentation is available on the [homepage](http://blikblum.github.io/riba/). Learn by reading the [Guide](http://blikblum.github.io/riba/docs/guide/) and refer to the [Binder Reference](http://blikblum.github.io/riba/docs/reference/) to see what binders are available to you out-of-the-box.

## Differences from Rivets.js

* Public interface
  * Add not formatter
  * Remove unless and unchecked binders in favor of combining not formatters with if/checked binders
  * Remove computed feature - can be replaced by an identity formatter
  * Add ability to customize input event through event-name attribute
* Internal changes
  * Written in TypeScript instead of CoffeeScript
  * Change how scope of iteration binder works. Instead of copying properties down to children, uses a prototype like approach
    * Related: [486](https://github.com/mikeric/rivets/issues/486) [512](https://github.com/mikeric/rivets/issues/512) [417](https://github.com/mikeric/rivets/pull/417)
  * Change how to customize index name in each binder (using an attribute)
    * Related: [551](https://github.com/mikeric/rivets/issues/551) [552](https://github.com/mikeric/rivets/pull/552)
  * Do not bind publish, bind and unbind methods to binding instances
  * Register default binder through fallbackBinder option instead of * binder
  * Integrate sightglass into riba code base
  * Remove view.select method
  * The rv-* attributes are removed after binding
  * Changes how observer is registered / notified. Instead of passing a function (sync), pass an object with a sync method

## Building and Testing

First install any development dependencies.

```bash
npm install
```

### Building

riba.js uses webpack as it's bundling / build tool. Run the following to compile the source into `dist/`.

```bash
npm run build
```

### Testing

riba.js uses [mocha](http://visionmedia.github.io/mocha/) as it's testing framework, alongside [should](https://github.com/visionmedia/should.js/) for expectations and [sinon](http://sinonjs.org/) for spies, stubs and mocks. Run the following to run the full test suite.

```bash
npm test
```

## Contributing

### Bug Reporting

1. Ensure the bug can be reproduced on the latest master.
2. Open an issue on GitHub and include an isolated [JSFiddle](http://jsfiddle.net/) demonstration of the bug. The more information you provide, the easier it will be to validate and fix.

### Pull Requests

1. Fork the repository and create a topic branch.
2. Make sure not to commit any changes under `dist/` as they will surely cause conflicts for others later. Files under `dist/` are only committed when a new build is released.
3. Include tests that cover any changes or additions that you've made.
4. Push your topic branch to your fork and submit a pull request. Include details about the changes as well as a reference to related issue(s).
