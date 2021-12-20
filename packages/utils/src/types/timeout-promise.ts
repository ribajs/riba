export interface TimeoutPromise<T> {
  _timeout?: ReturnType<typeof setTimeout>;
  cancel: () => void;
  promise: Promise<T>;
}
