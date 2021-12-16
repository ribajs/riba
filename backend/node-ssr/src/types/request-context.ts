import { ErrorObj } from "./error-obj";
import { ParsedQs } from "./parsed-query";

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
