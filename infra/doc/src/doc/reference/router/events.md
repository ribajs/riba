During all the lifecycle of the page transition, the router module will emit a series of events, with useful information:

| Name                | Arguments                        | Description                                                                                                 |
| ------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| linkClicked         | `HTMLElement`, `MouseEvent`      | The user has clicked on a link eligible for PJAX.                                                           |
| initStateChange     | `currentStatus`                  | The link has just been changed.                                                                             |
| newPageReady        | `viewId`, `currentStatus`, `prevStatus`, `HTMLElementContainer`, `newPageRawHTML`, `containerDataset` `isFirstPageLoad`| The new container has been loaded and was injected |
| transitionCompleted | `viewId`, `currentStatus` [, `prevStatus`] | The transition has just finished and the old Container has been removed from the DOM.             |

`currentStatus` and `prevStatus` are plain objects with the url of the page and eventually the namespace:

```typescript
export interface State {
  url: string;
  namespace?: string | null;
}
```

To listen for an event, it's as simple as:

```typescript
import { EventDispatcher } from '@ribajs/core';

const dispatcher = new EventDispatcher('main');

dispatcher.on('newPageReady', (viewId: string, currentStatus: State, prevStatus: State, container: HTMLElement, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
  // your listener
});
```
