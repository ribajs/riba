export interface ErrorObj {
  statusCode: number;
  message: string;
  timestamp: string;
  stack: string[];
  path: string;
}
