export interface IFormatter {
  (val: any, ...args: any[]): any;
  read?: (result: string, ...processedArgs: string[]) => void;
  publish?: (result: string, ...processedArgs: string[]) => void;
}

export interface IFormatters {
  [name: string]: IFormatter;
}

const formatters: IFormatters = {};

formatters.not = function (value: boolean) {
  return !value;
};

export { formatters };
