export interface TimeoutPromise<T> {
  _timeout?: number;
  cancel: () => void;
  promise: Promise<T>;
}
