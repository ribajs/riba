The router module is based on [barba.js v1](https://barba.js.org/) but was ported to typescript and changed a bit for the needs of this module. To understand how this module works in detail, we still recommend to read the documentation of barba.js.

### How it works

The router module uses PJAX (aka push state ajax) to enhance the user's experience.

This technique consist of preventing the normal link behavior (or alternatively via the `route` binder), changing the browser url manually, and manually injecting the new content in the page. In this way there will be no browser "hard refresh" as it is known from other SPA frameworks.

Unlike other SPA frameworks, however, no changes are necessary of how the templates are delivered. Therefore, the route module is also suitable to use with classic CMS systems such as Wordpress, OctoberCMS, Shopify and many more. On the server side your pages can be served normally. The router module works as ehnancement for your website, so everything else can be work normally without Javascript.

Here is a walkthrough of what happens when the user clicks a link (or the `route` binder):

1. Check if the link is valid and eligible for PJAX. If yes, prevent the normal browser behavior.
2. Change the URL using the push state API.
3. Start fetching the new page via a XMLHttpRequest.
4. Create a **new** transition instance.
5. As soon the new page is loaded, the router module parses the new HTML (taking the content of the `view` binder) and puts the new content on the DOM inside container element (passed as the `containerSelector` option on the `view` binder wich is `[data-namespace]` by default).
6. The transition instance will take care of hiding the old container and showing the new one.
7. As soon the transition is finished, the old container element is removed from the DOM.

### Why

Using this technique will bring numerous benefits:

* Possibility to create nice transition between pages enhancing the user's experience.
* Reduce HTTP requests. (why reload the css/js at each page change?)
* Possibility to speed up the navigation using prefetch and cache.
* Works well with classic CMS systems.
* Your page feels like an modern app
