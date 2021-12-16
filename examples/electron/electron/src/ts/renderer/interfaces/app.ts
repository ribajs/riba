export interface App {
  request: (channel: string, data: any) => void;
  response: (channel: string, cb: (...args: any) => void) => void;
}
