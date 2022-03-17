import { ErrorObj } from "./error-obj.js";
import { ParsedQs } from "./parsed-query.js";

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
