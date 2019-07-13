import { Debug } from '../modules';
import { IFormatter, IModuleFormatters, IModuleFormatterWrapper } from '../interfaces/formatter';
import { Utils } from './utils';

export class FormatterService {
  private formatters: IModuleFormatters = {};
  private debug = Debug('formatters:FormatterService');

  /**
   *
   */
  constructor(formatters?: IModuleFormatters) {
    if (formatters) {
      this.regists(formatters);
    }
  }

  /**
   * Regist a formatter with his name
   * @param formatter
   * @param name
   */
  public regist(formatter: IFormatter, name?: string): IModuleFormatters {
    if (!name) {
      if (formatter.hasOwnProperty('constructor')) {
        name = formatter.constructor.name;
      }

      if (formatter.hasOwnProperty('name')) {
        name = (formatter as any).name;
      }
    }

    this.debug('name', name, formatter);

    if (!name) {
      throw new Error('[FormatterService] name is required');
    }

    // if IBinder<any>
    this.formatters[name] = formatter;
    return this.formatters;
  }

  /**
   * Regist a set of formatters
   * @param formatters
   */
  public regists(formatters: IModuleFormatterWrapper[] | IModuleFormatters): IModuleFormatters {
    if (Utils.isArray(formatters)) {
      for (let index = 0; index < formatters.length; index++) {
        const formatterWrapper = (formatters as IModuleFormatterWrapper[])[index];
        this.regist((formatterWrapper as IModuleFormatterWrapper).formatter, (formatterWrapper as IModuleFormatterWrapper).name);
      }
    }
    if (Utils.isObject(formatters)) {
      for (const name in formatters) {
        if (formatters.hasOwnProperty(name)) {
          this.regist((formatters as IModuleFormatters)[name], name);
        }
      }
    }
    return this.formatters;
  }
}
