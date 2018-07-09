import Debug from 'debug';

export interface IOneWayFormatter {
  (val: any, ...args: any[]): any;
  read?: (result: string, ...processedArgs: string[]) => void;
}

export interface IOneTwoFormatter {
  read: (result: string, ...processedArgs: string[]) => void;
  publish: (result: string, ...processedArgs: string[]) => void;
}

export type IFormatter = IOneWayFormatter | IOneTwoFormatter;

export interface IFormatters {
  [name: string]: IFormatter;
}

export class FormatterService {
  private formatters: IFormatters;
  private debug = Debug('formatters:FormatterService');

  /**
   *
   */
  constructor(formatters: IFormatters) {
    this.formatters = formatters;
  }

  /**
   * Regist a formatter with his name
   * @param component
   * @param name
   */
  public regist(component: IFormatter, name?: string): IFormatters {
    if (!name) {
      if (component.hasOwnProperty('constructor')) {
        name = component.constructor.name;
      }

      if (component.hasOwnProperty('name')) {
        name = (component as any).name;
      }
    }

    this.debug('name', name, component);

    if (!name) {
      throw new Error('[FormatterService] name is required');
    }

    // if Binder<any>
    this.formatters[name] = component;
    return this.formatters;
  }

  /**
   * Regist a set of formatters
   * @param formatters
   */
  public regists(formatters: IFormatters): IFormatters {
    for (const name in formatters) {
      if (formatters.hasOwnProperty(name)) {
        this.regist(formatters[name], name);
      }
    }
    return this.formatters;
  }
}
