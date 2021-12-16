// See https://github.com/ribajs/riba/blob/master/packages/core/src/types/component-lifecycle-event-data.ts

import type { Component } from "./component.ts";

export interface ComponentLifecycleEventData {
  tagName: string;
  component: Component;
  // scope: any;
  // id: string;
}