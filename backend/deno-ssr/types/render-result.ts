// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/types/render-result.ts

import type { ComponentLifecycleEventData } from "./component-lifecycle-event-data.ts";

export interface RenderResult extends ComponentLifecycleEventData {
  html: string;
  css?: string[];
}
