// See https://github.com/ribajs/riba/blob/master/packages/ssr/src/types/shared-context.ts

import type { EventDispatcher } from "./event-dispatcher.ts";
import type { RequestContext } from "./request-context.ts";
import type { TemplateVars } from "./template-vars.ts";

export interface SharedContext {
  events?: EventDispatcher;
  env: {
    [key: string]: string;
  };
  templateVars: TemplateVars;
  ctx: Partial<RequestContext>;
}
