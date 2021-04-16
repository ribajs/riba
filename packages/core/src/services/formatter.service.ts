import { Formatter, Formatters } from "../types";
import { ModuleElementService } from "./module-element.service";

export class FormatterService extends ModuleElementService {
  protected type: "binder" | "formatter" | "components" | "services" =
    "formatter";

  /**
   *
   */
  constructor(formatters: Formatters) {
    super(formatters);
  }

  /**
   * Regist a formatter with his name
   * @param formatter
   * @param name
   */
  public regist(
    formatter: Formatter,
    fallbackName?: string,
    forceFallback = false
  ): Formatters {
    const name = forceFallback
      ? fallbackName || formatter.name
      : formatter.name || fallbackName;

    if (!name) {
      throw new Error("Formatter name not found!");
    }

    this.elements[name] = formatter;
    return this.elements;
  }
}
