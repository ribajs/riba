import {
  IBinders,
  IFormatters,
  IComponents,
  IServices,
  IAdapters,
} from '../interfaces';

export interface IRibaModule {
  /**
   * Binders can be a object of binders named by property key (IBinders<any>)
   * or an array of binders with binder and name property (IBinder<any>)
   */
  binders?: IBinders<any>;

  /**
   * Components must be a object of component classes
   */
  components?: IComponents;
  /**
   * Formatters can be a object of formatters named by property key (IFormatters)
   * or an array of binders with binder and name property (IFormatterWrapper)
   */
  formatters?: IFormatters;

  adapters?: IAdapters;

  /**
   * Components must be a object of service classes
   */
  services?: IServices;
}
