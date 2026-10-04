import { Formatter, FormatterContext } from "@ribajs/core";
import { I18nService } from "../services/i18n.service.js";
import type { LocalVars } from "../types/index.js";

const isFormatterContext = (value: unknown): value is FormatterContext =>
  !!value && typeof value === "object" && "invalidate" in value;

/**
 * `{ 'path.to.key' | t }`, `{ 'key' | t 'de' }`, `{ 'key' | t vars }` or both.
 * Reads synchronously and re-renders on `ready` and `changed`.
 * A key without a translation renders as the key itself.
 */
export const tFormatter: Formatter = {
  name: "t",
  read(
    path: string,
    arg1?: string | LocalVars | FormatterContext,
    arg2?: string | LocalVars | FormatterContext,
    arg3?: FormatterContext,
  ) {
    const localesService = I18nService.getLocalesService();
    let context: FormatterContext | undefined;
    let langcode: string | undefined;
    let vars: LocalVars | undefined;
    for (const arg of [arg1, arg2, arg3]) {
      if (isFormatterContext(arg)) {
        context = arg;
      } else if (typeof arg === "string") {
        langcode = arg;
      } else if (arg && typeof arg === "object") {
        vars = arg;
      }
    }

    if (context) {
      const invalidate = () => context.invalidate();
      context.on(localesService.event, "changed", invalidate, "changed");
      if (!localesService.ready) {
        context.on(localesService.event, "ready", invalidate, "ready");
      }
    }

    if (!localesService.ready || !path) {
      return "";
    }

    return localesService.translate(path, vars, langcode) ?? path;
  },
};
