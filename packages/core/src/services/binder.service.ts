import { Binders, ModuleElementType, ClassOfBinder } from "../types";
import { ModuleElementService } from "./module-element.service";

/**
 *
 */
export class BindersService extends ModuleElementService<ClassOfBinder> {
  protected type: ModuleElementType = "binder";

  /**
   *
   * @param binders;
   */
  constructor(binders: Binders) {
    super(binders);
  }

  /**
   * Regist a binder
   * @param binder
   * @param name  Overwrites the name to access the binder over
   */
  public regist(
    Binder: ClassOfBinder,
    fallbackName?: string,
    forceFallback = false
  ) {
    if (!Binder) {
      console.warn(new Error("Can not regist binder!"), Binder);
      return this.elements;
    }

    const name = forceFallback
      ? fallbackName || Binder.key
      : Binder.key || fallbackName;

    if (!name) {
      console.warn(new Error("Binder name not found!"), Binder);
      return this.elements;
    }

    this.elements[name] = Binder;
    return this.elements;
  }
}
