Add this binder to an element to trigger additional touch events.

Then you can react to the events with the `on-[event]` binder like this:

```html
<div rv-touch-events rv-on-swiperight="nextPage">
  ...
</div>
```

This binder uses `TouchEventsService` to trigger the additional events, check out the <a rv-scroll-to-on-click="'#touch-events-service'" href="#touch-events-service" data-offset="80">TouchEventsService</a> to find out what additional events are available.
