import {
  Adapters,
  Binders,
  Formatters,
  Components,
  RibaModule
} from "../types/index.js";
import { BindersService } from "./binder.service.js";
import { ComponentService } from "./component.service.js";
import { FormatterService } from "./formatter.service.js";
import { AdapterService } from "./adapter.service.js";

export class ModulesService {
  public binder: BindersService;
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
    binders: Binders<any>,
    components: Components,
    formatters: Formatters,
    adapters: Adapters
  ) {
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
