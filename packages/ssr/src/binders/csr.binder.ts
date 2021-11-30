import { BinderDeprecated } from "@ribajs/core";


/**
 * csr
 * Binder to pass a SSR binder to a CSR binder
 *
 * ```html
 * <div rv-csr-style="{'backgroundColor':'blue'}"></div>
 * ```
 */
export const csrBinder: BinderDeprecated<Partial<CSSStyleDeclaration>> = {
  name: "csr-*",
  routine(el: HTMLElement, value: Partial<CSSStyleDeclaration>) {
    const binderName = this.args[0];
    // TODO use prefix from config and remove single quotes in json string (if present)
    el.setAttribute(`rv-${binderName}`, `'${JSON.stringify(value)}'`);
  },
};
