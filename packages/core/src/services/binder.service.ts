import { Debug } from '../modules';
import { IBinder, IModuleBinderWrapper, IModuleBinders } from '../interfaces';
import { Utils } from './utils';

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
  public regist(binder: IBinder<any> | IModuleBinderWrapper, name?: string): IModuleBinders<any> {

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

    // if IBinder<any>
    this.binders[name] = (binder as IBinder<any>);
    return this.binders;
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regists(binders: IModuleBinderWrapper[] | IModuleBinders<any>): IModuleBinders<any> {
    if (Utils.isArray(binders)) {
      for (let index = 0; index < binders.length; index++) {
        const binder = (binders as IModuleBinderWrapper[])[index];
        this.regist(binder.binder, binder.name);
      }
    }
    if (Utils.isObject(binders)) {
      for (const name in binders) {
        if (binders.hasOwnProperty(name)) {
          this.regist((binders as IModuleBinders<any>)[name], name);
        }
      }
    }
    return this.binders;
  }
}
