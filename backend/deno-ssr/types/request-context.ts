// See https://github.com/ribajs/riba/blob/master/packages/ssr/src/types/request-context.ts

import { ErrorObj } from "./error-obj.ts";
import { ParsedQs } from "./parsed-query.ts";

export interface RequestContext {
  params: {
    [name: string]: string | undefined;
  };
  query: ParsedQs;
  protocol: string;
  hostname: string;
  status: number;
  method: string;
  errorObj?: ErrorObj;
}
