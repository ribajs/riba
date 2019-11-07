import { Binders, Formatters, Components, RibaModule } from '../interfaces';
import { BindersService } from './binder.service';
import { ComponentService } from './component.service';
import { FormatterService } from './formatter.service';

export class ModulesService {
  public binder: BindersService;
  public component: ComponentService;
  public formatter: FormatterService;

  /**
   *
   * @param binders;
   */
  constructor(binders: Binders<any>, components: Components, formatters: Formatters) {
    this.binder = new BindersService(binders);
    this.component = new ComponentService(components);
    this.formatter = new FormatterService(formatters);
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regist(module: RibaModule) {
    if (module.binders) {
      this.binder.regists(module.binders);
    }
    if (module.components) {
      this.component.regists(module.components);
    }
    if (module.formatters) {
      this.formatter.regists(module.formatters);
    }
  }
}
