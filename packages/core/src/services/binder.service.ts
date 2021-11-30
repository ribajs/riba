import { Binders, ModuleElementType, TypeOf, Elements } from "../types";
import { Binder } from "../binder";
import { ModuleElementService } from "./module-element.service";

/**
 * 
 */
export class BindersService extends ModuleElementService<TypeOf<Binder<any, any>>> {
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
    binder: TypeOf<Binder<any, any>>,
    fallbackName?: string,
    forceFallback = false
  ) {
    if (!binder) {
      console.warn(new Error("Can not regist binder!"), binder);
      return this.elements;
    }

    const name = forceFallback
      ? fallbackName || binder.name
      : binder.name || fallbackName;

    if (!name) {
      console.warn(new Error("Binder name not found!"), binder);
      return this.elements;
    }

    this.elements[name] = binder;
    return this.elements;
  }
}
