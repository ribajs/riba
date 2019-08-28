export type FormatterFn = (val: any, ...args: any[]) => any;

export interface IFormatter {
  name: string;
  read?: FormatterFn;
  publish?: FormatterFn;
  /**
   * A formatter can have any other private properties or methods
   */
  [propertyOrFunction: string]: any;
}
