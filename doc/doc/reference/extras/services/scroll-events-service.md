The `ScrollEventsService` adds additional scroll events to your element.

#### Usage

Create a new instance of the `ScrollEventsService` with an Element as argument to trigger the touch events on this element:

```ts
import { ScrollEventsService } from '@ribajs/extras';
const element = document.querySelector('.trigger-touch-events');
const ScrollEventsService = new ScrollEventsService(element);
element.addEventListener('scrollended' as any, (scrollEvent: CustomEvent) => {
  console.debug('the user has stopped scrolling', scrollEvent);
});
```

#### The Events

+ **`scrollstart`**  
Triggered as soon as scrolling begins on the target element.
+ **`scrollended`**  
Triggered as soon as scrolling is stopped on the target element.
