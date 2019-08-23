import { Debug } from '../modules';
import { IModuleBinders, IModuleFormatters, IComponents, IRibaModule } from '../interfaces';
import { BindersService } from './binder.service';
import { ComponentService } from './component.service';
import { FormatterService } from './formatter.service';

export class ModulesService {
  public binder: BindersService;
  public component: ComponentService;
  public formatter: FormatterService;
  protected debug = Debug('binders:ModulesService');

  /**
   *
   * @param binders;
   */
  constructor(binders: IModuleBinders<any>, components: IComponents, formatters: IModuleFormatters) {
    this.binder = new BindersService(binders);
    this.component = new ComponentService(components);
    this.formatter = new FormatterService(formatters);
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regist(module: IRibaModule) {
    if (module.binders) {
      this.debug('Regist binders; ', module.binders);
      this.binder.regists(module.binders);
    }
    if (module.components) {
      this.debug('Regist components; ', module.components);
      this.component.regists(module.components);
    }
    if (module.formatters) {
      this.debug('Regist formatters; ', module.formatters);
      this.formatter.regists(module.formatters);
    }
  }
}
