import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";

type BadgeType = "default" | "info" | "success" | "warning" | "error";
type BadgeSize = "sm" | "md" | "lg";

interface Scope extends ScopeBase {
  type: BadgeType;
  size: BadgeSize;
  outline: boolean;
}

const TYPE_CLASSES: Record<BadgeType, { solid: string; outline: string }> = {
  default: {
    solid: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    outline:
      "bg-transparent border border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400",
  },
  info: {
    solid: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    outline:
      "bg-transparent border border-blue-400 text-blue-400 dark:border-blue-500 dark:text-blue-500",
  },
  success: {
    solid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    outline:
      "bg-transparent border border-green-400 text-green-400 dark:border-green-500 dark:text-green-500",
  },
  warning: {
    solid:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    outline:
      "bg-transparent border border-yellow-400 text-yellow-400 dark:border-yellow-500 dark:text-yellow-500",
  },
  error: {
    solid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    outline:
      "bg-transparent border border-red-400 text-red-400 dark:border-red-500 dark:text-red-500",
  },
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "text-xs px-1.5 py-0.5",
  md: "text-xs px-2.5 py-0.5",
  lg: "text-sm px-3 py-1",
};

export class TwBadgeComponent extends Component {
  public static tagName = "tw-badge";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["type", "size", "outline"];
  }

  public scope: Scope = {
    type: "default",
    size: "md",
    outline: false,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwBadgeComponent.observedAttributes);
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
    if (["type", "size", "outline"].includes(attributeName)) {
      this.applyClasses();
    }
  }

  protected applyClasses() {
    const baseClasses = "inline-flex items-center font-medium rounded-full";
    const typeConfig = TYPE_CLASSES[this.scope.type] || TYPE_CLASSES.default;
    const colorClasses = this.scope.outline
      ? typeConfig.outline
      : typeConfig.solid;
    const sizeClasses = SIZE_CLASSES[this.scope.size] || SIZE_CLASSES.md;

    // Remove previously applied badge classes
    this.className = this.className
      .replace(
        /(^|\s)(inline-flex|items-center|font-medium|rounded-full|text-xs|text-sm|px-\S+|py-\S+|bg-\S+|text-\S+|border-\S+|border|dark:\S+)\b/g,
        "",
      )
      .trim();

    const allClasses = `${baseClasses} ${sizeClasses} ${colorClasses}`;
    allClasses.split(/\s+/).forEach((cls) => {
      if (cls) this.classList.add(cls);
    });
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
