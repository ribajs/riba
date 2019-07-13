import { Debug } from '../modules';
import { IBinder, IModuleBinders } from '../interfaces';
import { Utils } from './utils';

export class BindersService {
  private binders: IModuleBinders<any> = {};
  private debug = Debug('binders:BindersService');

  /**
   *
   * @param binders;
   */
  constructor(binders?: IModuleBinders<any>) {
    if (binders) {
      this.regists(binders);
    }
  }

  /**
   * Regist a binder
   * @param binder
   * @param name  Overwrites the name to access the binder over
   */
  public regist(binder: IBinder<any>, name?: string): IModuleBinders<any> {
    this.binders[name || binder.name] = binder;
    return this.binders;
  }

  /**
   * Regist a set of binders
   * @param binders
   */
  public regists(binders: IBinder<any>[] | IModuleBinders<any>): IModuleBinders<any> {
    if (Utils.isArray(binders)) {
      for (let index = 0; index < binders.length; index++) {
        const binder = (binders as IBinder<any>[])[index];
        this.regist(binder, binder.name);
      }
    }
    if (Utils.isObject(binders)) {
      for (const key in binders as IModuleBinders<any>) {
        if (binders.hasOwnProperty(key)) {
          const binder = (binders as IModuleBinders<any>)[key];
          this.regist(binder);
        }
      }
    }
    return this.binders;
  }
}
