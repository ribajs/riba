import { IBinder, IBinders } from '../interfaces';
import { ModuleElementService } from './module-element.service';
export declare class BindersService extends ModuleElementService {
    protected type: 'binder' | 'formatter' | 'components' | 'services';
    /**
     *
     * @param binders;
     */
    constructor(binders: IBinders<any>);
    /**
     * Regist a binder
     * @param binder
     * @param name  Overwrites the name to access the binder over
     */
    regist(binder: IBinder<any>, fallbackName?: string, forceFallback?: boolean): IBinders<any>;
}
