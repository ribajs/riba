The `TouchEventsService` is a re-implementation of the beautiful [jQuery Touch Events](https://github.com/benmajor/jQuery-Touch-Events) module in vanilla JavaScript (JQuery free).

#### Usage

Create a new instance of the `TouchEventsService` with an Element as argument to trigger the touch events on this element:

```ts
import { TouchEventsService } from '@ribajs/extras';
const element = document.querySelector('.trigger-touch-events');
const touchEventService = new TouchEventsService(element);
element.addEventListener('swiperight' as any, (swipeEvent: CustomEvent) => {
  console.debug('swiperight x amount', swipeEvent.detail.xAmount);
});
```

#### The Events

+ **`tapstart`**  
Fired as soon as the user begins touching an element (or clicking, for desktop environments).
+ **`tapend`**  
Fired after the user releases their finger from the target element (or releases their mouse button on desktops).
+ **`tapmove`**  
Fired as soon as the user begins moving their finger on an element (or moving their mouse, for desktop environments).
+ **`tap`**  
This event is fired whenever the user taps and releases their finger on the target element. Caution should be observed when using this event in conjunction with tap events, especially ``doubletap``. This event will be fired twice when ``doubletap`` is used, so it is recommended to use ``singletap`` in this case.
+ **`singletap`**  
Unlike ``tap`` this event is only triggered once we are certain the user has only tapped the target element a single time. This will not be triggered by ``doubletap`` or ``taphold``, unlike ``tap``. Since we need to run some tests to make sure the user isn't double tapping or holding a tap on the target element, this event is fired with a short delay (currently of 500 milliseconds).
+ **`doubletap`**  
Triggered whenever the user double taps on the target element. The threshold (time between taps) is currently set at 500 milliseconds.
+ **`taphold`**  
This event is triggered whenever the user taps on the target element and leaves their finger on the element for at least *750 milliseconds*.
+ **`swipe`**  
This is called whenever the user swipes their finger on the target element. It is not direction-dependent, and is fired regardless of the direction the user swiped.
+ **`swipeup`**  
Similar to ``swipe``, except only called when the user swipes their finger in an upward direction on the target element (i.e. bottom to top)
+ **`swiperight`**  
Similar to ``swipe``, but triggered only when the user swipes their finger left to right on the target element.
+ **`swipedown`**  
Similar to ``swipe``, but triggered only when the user swipes their finger top to bottom on the target element.
+ **`swipeleft`**  
Similar to ``swipe``, but triggered only when the user swipes their finger from right to left.
+ **`swipeend`**  
The ``swipeend`` event is trigged whenever a swipe event ends (i.e. the user finished moving their finger / cursor and released it). This event should be used to handle custom functions, since it will be triggered only when the swipe ends, rather than triggering immediately when the threshold has been met.

#### Event detail properties

Each event now features detail properties that can be accessed via the detail property. The detail property includes some basic data relating specifically to the event, and can be accessed as a standard JavaScript object. To hook into this properties, you should use the following code:

```ts
element.addEventListener('swipeend' as any, (event: CustomEvent) => {
  console.debug('swipeend extra data', event.detail);
});
```

Given the example above, the detail object will now contain some basic data that can be accessed through `event.detail`.. The `event.detail.originalEvent`  will represent the last native event that occurred.

Each event provides different extra data. The following shows the numerous data that has been assigned to the detail object:

#### `tapstart`, `tapend`, `tapmove`, `singletap`

`offset` - object containing the X and Y positions of the event relative to the element to which is was bound. Accessed through `offset.x` and `offset.y` respectively.

`position` - object containing the X and Y positions of the event relative to the screen. Accessed through `position.x` and `position.y` respectively.

`time` - JavaScript timestamp the event occurred (milliseconds since the Unix Epoch)

`target` - the element from which the event was triggered.

`originalEvent` - the the last native event that occurred.

#### `tap`

`touches` - Array of object containing `position` and `offset`.

`touches[i].offset` - object containing the X and Y positions of the event relative to the element to which is was bound. Accessed through `offset.x` and `offset.y` respectively.

`touches[i].position` - object containing the X and Y positions of the event relative to the screen. Accessed through `position.x` and `position.y` respectively.

`time` - JavaScript timestamp the event occurred (milliseconds since the Unix Epoch)

`target` - the element from which the event was triggered.

`originalEvent` - the the last native event that occurred.

#### `taphold`

`touches` - Array of object containing `position` and `offset`.

`touches[i].offset` - object containing the X and Y positions of the event relative to the element to which is was bound. Accessed through `offset.x` and `offset.y` respectively.

`touches[i].position` - object containing the X and Y positions of the event relative to the screen. Accessed through `position.x` and `position.y` respectively.

`duration`: the time in milliseconds that the user tapped for.

`time` - JavaScript timestamp the event occurred (milliseconds since the Unix Epoch)

`target` - the element from which the event was triggered.

`originalEvent` - the the last native event that occurred.

#### `doubletap`

`firstTap` - Object containing the same data as a `tap` event, but for the first tap to occur.

`secondTap` - Object containing the same data as a `tap` event, but for the second (i.e. final) tap to occur.

`interval` - the time in milliseconds between the two tap.

`target` - the element from which the event was triggered.

`originalEvent` - the the last native event that occurred.

#### `swipe`, `swipeup`, `swiperight`, `swipedown`, `swipeleft`, `swipeend`

`direction` - string representing the swipe direction (either `up`, `right`, `down` or `left`).

`duration` - the time in milliseconds over which the swipe took place (for best results, use with `swipeend` only, as this will typically be equal to the defined `swipe-threshold`.

`xAmount` - number of pixels the swipe occupied on the X-axis (returned regardless of direction).

`yAmount` - number of pixels the swipe occupied on the Y-axis (returned regardless of direction).

`startEvnt` - Object containing the same data as a `tap` event, but captured when swiping begins.

`endEvnt` - Object containing the same data as a `tap` event, but captured when swiping is complete.

`target` - the element from which the event was triggered.

`originalEvent` - the the last native event that occurred.

#### Properties

+ `isTouchCapable`:  
`true` or `false` depending upon whether touch events are supported.
+ `startEvent`:  
`touchstart` for touch-enabled devices, or `mousedown` for standard environments.
+ `endEvent`:  
`touchend` for touch-enabled devices, or `mouseup` for standard environments.
+ `moveEvent`:  
`touchmove` for touch-enabled devices, or `mousemove` for standard environments.
+ `tapEvent`:  
`tap` for touch-enabled devices, or `click` for standard environments.

