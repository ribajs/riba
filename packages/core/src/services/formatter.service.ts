import { Debug } from '../modules';
import { IFormatter, IModuleFormatters } from '../interfaces/formatter';

export class FormatterService {
  private formatters: IModuleFormatters;
  private debug = Debug('formatters:FormatterService');

  /**
   *
   */
  constructor(formatters: IModuleFormatters) {
    this.formatters = formatters;
  }

  /**
   * Regist a formatter with his name
   * @param component
   * @param name
   */
  public regist(component: IFormatter, name?: string): IModuleFormatters {
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
  public regists(formatters: IModuleFormatters): IModuleFormatters {
    for (const name in formatters) {
      if (formatters.hasOwnProperty(name)) {
        this.regist(formatters[name], name);
      }
    }
    return this.formatters;
  }
}
