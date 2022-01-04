// See https://github.com/ribajs/riba/blob/master/packages/ssr/src/types/error-obj.ts

export interface ErrorObj {
  statusCode: number;
  message: string;
  timestamp: string;
  stack: string[];
  path: string;
  before?: ErrorObj;
}
