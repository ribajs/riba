import { IFormatter, IFormatters} from '../interfaces';
import { ModuleElementService } from './module-element.service';

export class FormatterService extends ModuleElementService {

  protected type: 'binder' | 'formatter' | 'components' | 'services' = 'formatter';

  /**
   *
   */
  constructor(formatters: IFormatters) {
   super(formatters);
  }

  /**
   * Regist a formatter with his name
   * @param formatter
   * @param name
   */
  public regist(formatter: IFormatter, name?: string): IFormatters {
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

    this.elements[name] = formatter;
    return this.elements;
  }

  /**
   * Regist a set of formatters
   * @param formatters
   */
  public regists(formatters: IFormatters): IFormatters {
    for (const name in formatters) {
      if (formatters.hasOwnProperty(name)) {
        const formatter = (formatters as IFormatters)[name];
        this.debug(`Regist formatter with key "${name}"`, formatter);
        this.regist(formatter, name);
      }
    }
    return this.elements;
  }

}
