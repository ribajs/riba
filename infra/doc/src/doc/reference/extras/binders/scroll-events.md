Add this binder to an element to trigger additional scroll events.

Then you can react to the events with the `on-[event]` binder like this:

```html
<div rv-scroll-events rv-on-scrollended="showPopup">
  ...
</div>
```

This binder uses `ScrollEventsService` to trigger additional scroll events on the element, check out the <a rv-scroll-to-on-click="'#scroll-events-service'" href="#scroll-events-service" data-offset="80">ScrollEventsService</a> to find out what additional events are available.
