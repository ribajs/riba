import {
  Adapters,
  Binders,
  BindersDeprecated,
  Formatters,
  Components,
  RibaModule,
} from "../types";
import { BindersService } from "./binder.service";
import { BindersDeprecatedService } from "./binder-depricated.service";
import { ComponentService } from "./component.service";
import { FormatterService } from "./formatter.service";
import { AdapterService } from "./adapter.service";

export class ModulesService {
  public binder: BindersService;
  public binderDeprecated: BindersDeprecatedService;
  public component: ComponentService;
  public formatter: FormatterService;
  public adapter: AdapterService;

  /**
   *
   * @param binders;
   * @param components;
   * @param formatters;
   * @param adapters;
   */
  constructor(
    binderDeprecated: BindersDeprecated<any>,
    binders: Binders<any>,
    components: Components,
    formatters: Formatters,
    adapters: Adapters
  ) {
    this.binderDeprecated = new BindersDeprecatedService(binderDeprecated);
    this.binder = new BindersService(binders);
    this.component = new ComponentService(components);
    this.formatter = new FormatterService(formatters);
    this.adapter = new AdapterService(adapters);
  }

  public regist(module: RibaModule) {
    if (!module) {
      console.error(module);
      throw new Error("The Riba module is falsy!");
    }
    if (module.bindersDeprecated) {
      this.binderDeprecated.regists(module.bindersDeprecated);
    }
    if (module.binders) {
      this.binder.regists(module.binders);
    }
    if (module.components) {
      this.component.regists(module.components);
    }
    if (module.formatters) {
      this.formatter.regists(module.formatters);
    }
    if (module.adapters) {
      this.adapter.regists(module.adapters);
    }
  }
}
