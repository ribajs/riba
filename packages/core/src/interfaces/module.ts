import {
  IModuleBinderWrapper,
  IModuleBinders,
  IModuleFormatterWrapper,
  IModuleFormatters,
  IModuleComponents,
  IServices,
  IAdapters,
} from '../interfaces';

export interface IRibaModule {
  /**
   * Binders can be a object of binders named by property key (IModuleBinders<any>)
   * or an array of binders with binder and name property (IModuleBinderWrapper[])
   */
  binders?: IModuleBinderWrapper[] | IModuleBinders<any>;

  /**
   * Components must be a object of component classes
   */
  components?: IModuleComponents;
  /**
   * Formatters can be a object of formatters named by property key (IModuleFormatters)
   * or an array of binders with binder and name property (IModuleFormatterWrapper)
   */
  formatters?: IModuleFormatterWrapper[] | IModuleFormatters;

  adapters?: IAdapters;

  /**
   * Components must be a object of service classes
   */
  services?: IServices;
}
