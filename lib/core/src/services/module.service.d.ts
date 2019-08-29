import { Debug } from '../vendors';
import { IBinders, IFormatters, IComponents, IRibaModule } from '../interfaces';
import { BindersService } from './binder.service';
import { ComponentService } from './component.service';
import { FormatterService } from './formatter.service';
export declare class ModulesService {
    binder: BindersService;
    component: ComponentService;
    formatter: FormatterService;
    protected debug: Debug.Debugger;
    /**
     *
     * @param binders;
     */
    constructor(binders: IBinders<any>, components: IComponents, formatters: IFormatters);
    /**
     * Regist a set of binders
     * @param binders
     */
    regist(module: IRibaModule): void;
}
