import { camelCase } from "@ribajs/utils/src/type.js";
import { Formatter, FormatterFn, Formatters } from "../types/index.js";
import { ModuleElementService } from "./module-element.service.js";

/** Warn once per legacy formatter id per session (camelCase alias). */
const formatterDeprecationWarned = new Set<string>();

function warnFormatterDeprecationOnce(legacyId: string, canonicalId: string) {
  if (formatterDeprecationWarned.has(legacyId)) return;
  formatterDeprecationWarned.add(legacyId);
  console.warn(
    `[Riba] Formatter "${legacyId}" is deprecated; use "${canonicalId}" instead.`,
  );
}

/**
 * Registers the same formatter under a camelCase id and logs deprecation when used.
 */
function wrapDeprecatedFormatterAlias(
  formatter: Formatter,
  legacyId: string,
  canonicalId: string,
): Formatter {
  const wrap = (fn: FormatterFn | undefined): FormatterFn | undefined => {
    if (!fn) return fn;
    const wrapped: FormatterFn = function (this: unknown, val: any, ...args: any[]) {
      warnFormatterDeprecationOnce(legacyId, canonicalId);
      return fn.call(this, val, ...args);
    };
    return wrapped;
  };

  return {
    ...formatter,
    name: legacyId,
    read: wrap(formatter.read),
    publish: wrap(formatter.publish),
  };
}

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
   */
  public register(
    formatter: Formatter,
    fallbackName?: string,
    forceFallback = false,
  ): Formatters {
    const name = forceFallback
      ? fallbackName || formatter.name
      : formatter.name || fallbackName;

    if (!name) {
      throw new Error("Formatter name not found!");
    }

    this.elements[name] = formatter;

    // Back-compat: kebab-case is canonical; register camelCase alias with deprecation.
    if (name.includes("-")) {
      const legacyId = camelCase(name);
      if (legacyId !== name && !Object.prototype.hasOwnProperty.call(this.elements, legacyId)) {
        this.elements[legacyId] = wrapDeprecatedFormatterAlias(
          formatter,
          legacyId,
          name,
        );
      }
    }

    return this.elements;
  }
}
