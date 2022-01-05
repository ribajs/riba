import type { ErrorObj } from "./error-obj";
import type { ParsedQs } from "./parsed-query";
export interface RequestContext {
    params: {
        [name: string]: string | undefined;
    };
    query: ParsedQs;
    protocol: string;
    hostname: string;
    status: number;
    method: string;
    path: string;
    url: string;
    errorObj?: ErrorObj;
}
