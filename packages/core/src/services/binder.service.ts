import { Binder, Binders, ModuleElementType } from "../types";
import { ModuleElementService } from "./module-element.service";

export class BindersService extends ModuleElementService {
  protected type: ModuleElementType = "binder";

  /**
   *
   * @param binders;
   */
  constructor(binders: Binders<any>) {
    super(binders);
  }

  /**
   * Regist a binder
   * @param binder
   * @param name  Overwrites the name to access the binder over
   */
  public regist(
    binder: Binder<any>,
    fallbackName?: string,
    forceFallback = false
  ): Binders<any> {
    if (!binder || typeof binder.routine !== "function") {
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
