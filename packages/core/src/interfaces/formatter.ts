export interface IOneWayFormatter {
  (val: any, ...args: any[]): any;
  read?: (result: string, ...processedArgs: string[]) => void;
}

export interface IOneTwoFormatter {
  read: (result: string, ...processedArgs: string[]) => void;
  publish: (result: string, ...processedArgs: string[]) => void;
}

export type IFormatter = IOneWayFormatter | IOneTwoFormatter;

export interface IModuleFormatters {
  [name: string]: IFormatter;
}

/**
 * This wrapper i used to store the binder name in the name property
 */
export interface IModuleFormatterWrapper {
  name: string;
  formatter: IFormatter;
}
