import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";

type KbdSize = "sm" | "md" | "lg";

interface Scope extends ScopeBase {
  size: KbdSize;
}

const SIZE_CLASSES: Record<KbdSize, string> = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-1 text-sm",
  lg: "px-2.5 py-1.5 text-base",
};

export class TwKbdComponent extends Component {
  public static tagName = "tw-kbd";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["size"];
  }

  public scope: Scope = {
    size: "md",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwKbdComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async afterBind() {
    await super.afterBind();
    this.applyClasses();
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName === "size") {
      this.applyClasses();
    }
  }

  protected applyClasses() {
    const baseClasses =
      "inline-flex items-center rounded-md border border-gray-300 bg-gray-100 font-mono font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm";
    const sizeClasses = SIZE_CLASSES[this.scope.size] || SIZE_CLASSES.md;

    // Remove previously applied kbd classes
    this.className = this.className.replace(
      /(^|\s)(inline-flex|items-center|rounded-md|border-\S+|border|bg-\S+|font-mono|font-semibold|text-\S+|px-\S+|py-\S+|shadow-sm|dark:\S+)\b/g,
      "",
    ).trim();

    const allClasses = `${baseClasses} ${sizeClasses}`;
    allClasses.split(/\s+/).forEach((cls) => {
      if (cls) this.classList.add(cls);
    });
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
