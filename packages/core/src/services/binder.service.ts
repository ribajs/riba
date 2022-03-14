import { Binders, ModuleElementType, ClassOfBinder } from "../types/index.js";
import { ModuleElementService } from "./module-element.service.js";

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
      throw new Error("No Binder passed to register!");
    }

    const name = forceFallback
      ? fallbackName || Binder.key
      : Binder.key || fallbackName;

    if (!name) {
      throw new Error("Binder name not found!");
    }

    this.elements[name] = Binder;
    return this.elements;
  }
}
