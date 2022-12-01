import { BasicComponent, TemplateFunction } from "@ribajs/core";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Scope {}

/**
 * Use this component to be able to write inline scripts which also works with client side routing.
 * @example
 * ```html
 *
 * <script>
 *   // Instead of this
 *   console.log("Hello World");
 * </script>
 *
 * <rv-inline-script>
 *   // You can now use this
 *   console.log("Hello World");
 * </rv-inline-script>
 * ```
 */
export class InlineScriptComponent extends BasicComponent {
  public static tagName = "rv-inline-script";

  public scope: Scope = {};

  static get observedAttributes(): string[] {
    return [];
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(InlineScriptComponent.observedAttributes);
    const jsStr = this.innerHTML; // Do not use innerText here to keep the breakpoints
    try {
      eval(jsStr);
    } catch (error) {
      console.error(
        `[rv-inline-script] Error on evaluate inline script!\n"${jsStr}"\n`,
        error
      );
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
