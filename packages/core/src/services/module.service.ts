import { Debug } from '../modules';
import { IModuleBinders, IModuleFormatters, IComponents, IRibaModule } from '../interfaces';
import { BindersService } from './binder.service';
import { ComponentService } from './component.service';
import { FormatterService } from './formatter.service';

export class ModulesService {
  public binderService: BindersService;
  public componentService: ComponentService;
  public formatterService: FormatterService;
  protected debug = Debug('binders:ModulesService');

  /**
   *
   * @param binders;
   */
  constructor(binders: IModuleBinders<any>, components: IComponents, formatters: IModuleFormatters) {
    this.binderService = new BindersService(binders);
    this.componentService = new ComponentService(components);
    this.formatterService = new FormatterService(formatters);
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regist(module: IRibaModule) {
    if (module.binders) {
      this.binderService.regists(module.binders);
    }
    if (module.components) {
      this.componentService.regists(module.components);
    }
    if (module.formatters) {
      this.formatterService.regists(module.formatters);
    }
  }
}
