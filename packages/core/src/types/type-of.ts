/**
 * Interface for type of class
 * @see https://stackoverflow.com/a/56363362
 */
export interface TypeOf<T> extends Function {
  // tslint:disable:callable-types
  new (...args: any[]): T;
}
