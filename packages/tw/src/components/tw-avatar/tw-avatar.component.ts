import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-avatar.component.html?raw";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarStatus = "" | "online" | "offline" | "busy" | "away";

interface Scope extends ScopeBase {
  src: string;
  alt: string;
  size: AvatarSize;
  status: AvatarStatus;
  placeholder: string;
  initials: string;
  imgClass: string;
  placeholderClass: string;
  dotClass: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

const STATUS_DOT_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
  xl: "h-4 w-4",
};

const STATUS_COLOR_CLASSES: Record<string, string> = {
  online: "bg-green-400",
  offline: "bg-gray-400",
  busy: "bg-red-400",
  away: "bg-yellow-400",
};

const INITIALS_TEXT_SIZE: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
};

export class TwAvatarComponent extends Component {
  public static tagName = "tw-avatar";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["src", "alt", "size", "status", "placeholder"];
  }

  public scope: Scope = {
    src: "",
    alt: "",
    size: "md",
    status: "",
    placeholder: "",
    initials: "",
    imgClass: SIZE_CLASSES.md,
    placeholderClass: `${SIZE_CLASSES.md} ${INITIALS_TEXT_SIZE.md}`,
    dotClass: STATUS_DOT_SIZE_CLASSES.md,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwAvatarComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
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
    this.updateComputedScope();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.updateComputedScope();
  }

  protected updateComputedScope() {
    const size = this.scope.size || "md";
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    const textClass = INITIALS_TEXT_SIZE[size] || INITIALS_TEXT_SIZE.md;
    const dotSize =
      STATUS_DOT_SIZE_CLASSES[size] || STATUS_DOT_SIZE_CLASSES.md;
    const dotColor = this.scope.status
      ? STATUS_COLOR_CLASSES[this.scope.status] || ""
      : "";

    this.scope.imgClass = sizeClass;
    this.scope.placeholderClass = `${sizeClass} ${textClass}`;
    this.scope.dotClass = `${dotSize} ${dotColor}`.trim();

    // Derive initials from placeholder text
    if (this.scope.placeholder) {
      const text = this.scope.placeholder.trim();
      const parts = text.split(/\s+/);
      if (parts.length === 1 && text.length <= 3) {
        this.scope.initials = text.toUpperCase();
      } else {
        this.scope.initials = parts
          .slice(0, 2)
          .map((p) => p.charAt(0).toUpperCase())
          .join("");
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
