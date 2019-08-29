import { IFormatter, IFormatters } from '../interfaces';
import { ModuleElementService } from './module-element.service';
export declare class FormatterService extends ModuleElementService {
    protected type: 'binder' | 'formatter' | 'components' | 'services';
    /**
     *
     */
    constructor(formatters: IFormatters);
    /**
     * Regist a formatter with his name
     * @param formatter
     * @param name
     */
    regist(formatter: IFormatter, fallbackName?: string, forceFallback?: boolean): IFormatters;
}
