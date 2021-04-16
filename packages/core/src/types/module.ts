import { Binders, Formatters, Components, Services, Adapters } from ".";

export interface RibaModule {
  /**
   * Binders can be a object of binders named by property key (Binders<any>)
   * or an array of binders with binder and name property (Binder<any>)
   */
  binders?: Binders<any>;

  /**
   * Components must be a object of component classes
   */
  components?: Components;
  /**
   * Formatters can be a object of formatters named by property key (Formatters)
   * or an array of binders with binder and name property (FormatterWrapper)
   */
  formatters?: Formatters;

  adapters?: Adapters;

  /**
   * Components must be a object of service classes
   */
  services?: Services;

  helper?: { [key: string]: (...args: any[]) => any };

  constants?: { [key: string]: any };
}
