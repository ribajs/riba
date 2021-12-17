// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/types/render-result.ts

import type { ComponentLifecycleEventData } from "./component-lifecycle-event-data.ts";
import type { ConsoleMessage } from "./console-message.ts";

export interface RenderResult extends ComponentLifecycleEventData {
  html: string;
  css?: string[];
  output?: ConsoleMessage[];
}
