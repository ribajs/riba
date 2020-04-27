export interface Deferred {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  promise: Promise<any>;
}
