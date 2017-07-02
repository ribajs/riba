This branch is used to keep the changes necessary to fit my needs, it improve performance and
reduce memory usage:

* Change how scope of iteration binder works. Instead of copying properties down to children, uses a prototype like approach
  * Related: [486](https://github.com/mikeric/rivets/issues/486) [512](https://github.com/mikeric/rivets/issues/512) [417](https://github.com/mikeric/rivets/pull/417)
* Change how to customize index name in each binder (using an attribute)
  * Related: [551](https://github.com/mikeric/rivets/issues/551) [552](https://github.com/mikeric/rivets/pull/552) 
* Add ability to customize input event through event-name attribute 
* Do not bind publish, bind and unbind methods to binding instances
* Register default binder through fallbackBinder option instead of * binder
* Integrate sightglass into rivets code base
* Remove view.select method 
* Rename binding property args to arg and changed type from array to string
* The rv-* attributes are removed after binding
* Remove unless and unchecked binders
* Add not/negate formatter
* Changes how observer is registered / notified. Instead of passing a function (sync), pass an object with a sync method
* Remove component binding -> buggy, untested code. Prefer standard compliant custom component implementation 
* Remove compute feature - can be replaced by an identity formatter

# Rivets.js

Rivets.js is a lightweight data binding and templating system that facilitates building data-driven views. It is agnostic about every aspect of a front-end MV(C|VM|P) stack, making it easy to introduce it into your current workflow or to use it as part of your own custom front-end stack comprised of other libraries.

## Usage

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
rivets.bind($('#auction'), {auction: auction})
```

## Getting Started and Documentation

Documentation is available on the [homepage](http://rivetsjs.com). Learn by reading the [Guide](http://rivetsjs.com/docs/guide/) and refer to the [Binder Reference](http://rivetsjs.com/docs/reference/) to see what binders are available to you out-of-the-box.

## Building and Testing

First install any development dependencies.

```
$ npm install
```

#### Building

Rivets.js uses [webpack](http://gulpjs.com/) as it's bundling / build tool. Run the following  to compile the source into `dist/`.

```
$ npm run build
```

#### Testing

Rivets.js uses [mocha](http://visionmedia.github.io/mocha/) as it's testing framework, alongside [should](https://github.com/visionmedia/should.js/) for expectations and [sinon](http://sinonjs.org/) for spies, stubs and mocks. Run the following to run the full test suite.

```
$ npm test
```

## Contributing

#### Bug Reporting

1. Ensure the bug can be reproduced on the latest master.
2. Open an issue on GitHub and include an isolated [JSFiddle](http://jsfiddle.net/) demonstration of the bug. The more information you provide, the easier it will be to validate and fix.

#### Pull Requests

1. Fork the repository and create a topic branch.
3. Make sure not to commit any changes under `dist/` as they will surely cause conflicts for others later. Files under `dist/` are only committed when a new build is released.
4. Include tests that cover any changes or additions that you've made.
5. Push your topic branch to your fork and submit a pull request. Include details about the changes as well as a reference to related issue(s).
