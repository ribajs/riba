import type { EventDispatcher } from "@ribajs/events";
import type { RequestContext } from "./request-context";
export interface SharedContext {
    events?: EventDispatcher;
    env: {
        [key: string]: string;
    };
    templateVars: any;
    ctx: Partial<RequestContext>;
}
