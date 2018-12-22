import { Debug } from '../modules';
import { Binder, IModuleBinderWrapper, IModuleBinders } from '../interfaces';

/**
 * This wrapper is used if you need to pass over some dependencies for your binder
 */
export type BinderWrapper = (...deps: any[]) => IModuleBinderWrapper;

export class BindersService {
  private binders: IModuleBinders<any>;
  private debug = Debug('binders:BindersService');

  /**
   *
   * @param binders;
   */
  constructor(binders: IModuleBinders<any>) {
    this.binders = binders;
  }

  /**
   * Regist a binder wrapper
   * @param binder
   * @param name
   */
  public registWrapper(binderWrapper: IModuleBinderWrapper, name?: string): IModuleBinders<any> {
    if (!name) {
      name = binderWrapper.name;
    }
    const binder = (binderWrapper as IModuleBinderWrapper).binder;
    this.binders[name] = binder;
    return this.binders;
  }

  /**
   * Regist a binder with his name
   * @param binder
   * @param name
   */
  public regist(binder: Binder<any> | IModuleBinderWrapper, name?: string): IModuleBinders<any> {

    if (binder.hasOwnProperty('binder')) {
      binder = (binder as IModuleBinderWrapper);
      if (!name) {
        name = (binder as any).name;
      }
      binder = binder.binder;
    }

    this.debug('name', name, binder);

    if (!name) {
      throw new Error('[BindersService] name is required');
    }

    // if Binder<any>
    this.binders[name] = (binder as Binder<any>);
    return this.binders;
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regists(binders: IModuleBinders<any>): IModuleBinders<any> {
    for (const name in binders) {
      if (binders.hasOwnProperty(name)) {
        this.regist(binders[name], name);
      }
    }
    return this.binders;
  }
}
