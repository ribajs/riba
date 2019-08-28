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
  public regist(formatter: IFormatter, fallbackName?: string): IFormatters {

    const name = formatter.name || fallbackName;

    if (!name) {
      throw new Error('Formatter name not found!');
    }

    this.elements[name] = formatter;
    return this.elements;
  }
}
