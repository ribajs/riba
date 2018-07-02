export interface IFormatter {
  (val: any, ...args: any[]): any;
  read?: (result: string, ...processedArgs: string[]) => void;
  publish?: (result: string, ...processedArgs: string[]) => void;
}

export interface IFormatters {
  [name: string]: IFormatter;
}

const formatters: IFormatters = {};

/**
 * negate a boolean value
 */
formatters.not = function (value: boolean) {
  return !value;
};

/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
formatters.parse = (jsonString: string) => {
  if (typeof(jsonString) === 'string') {
    const object = JSON.parse(jsonString);
    return object;
  }
  return null;
};

/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
formatters.json = (obj: any) => {
  return JSON.stringify(obj);
};

export { formatters };
