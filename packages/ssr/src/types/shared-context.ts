import type { EventDispatcher } from "@ribajs/events";
import type { RequestContext } from "./request-context.js";
export interface SharedContext {
  events?: EventDispatcher;
  env: {
    [key: string]: string;
  };
  templateVars: any; // TODO use TemplateVars interface here
  ctx: Partial<RequestContext>;
}
