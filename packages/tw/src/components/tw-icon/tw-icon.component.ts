import { BasicComponent, TemplateFunction } from "@ribajs/core";

const iconCache = new Map<string, string>();

export class TwIconComponent extends BasicComponent {
  public static tagName = "tw-icon";

  static get observedAttributes(): string[] {
    return ["size", "width", "height", "src", "color", "direction", "alt"];
  }

  protected autobind = false;
  public scope: any = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("role", "icon");
    this.setAttribute("alt", "icon");
    this.classList.add("iconset");
    this.init(TwIconComponent.observedAttributes);
    // set default values
    if (!this.scope.direction) {
      this.scope.direction = "up";
      this.attributeChangedCallback(
        "direction",
        null,
        this.scope.direction,
        null,
      );
    }
  }

  protected async attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    if (name === "src") {
      this.onSrcChanged();
    }

    if (name === "color") {
      this.setColor(newValue);
    }

    if (name === "size") {
      this.setSize(newValue);
    }

    if (name === "width") {
      this.setWidth(newValue);
    }

    if (name === "height") {
      this.setHeight(newValue);
    }

    if (name === "direction") {
      this.setDirection(newValue);
    }
  }

  protected getSvg() {
    return this.querySelector("svg");
  }

  protected async loadIcon(src: string) {
    try {
      let svgText = iconCache.get(src);
      if (!svgText) {
        const response = await fetch(src);
        svgText = await response.text();
        iconCache.set(src, svgText);
      }
      // Note: innerHTML is used intentionally here to inject SVG markup from
      // trusted icon sources, consistent with the bs5-icon implementation.
      this.innerHTML = svgText;
    } catch (error) {
      console.error(`[tw-icon] Failed to load icon: ${src}`, error);
    }
  }

  protected async onSrcChanged() {
    if (!this.scope.src) {
      this.innerHTML = "";
      return;
    }

    const currentSvg = this.getSvg();
    const oldSrc = currentSvg ? currentSvg.getAttribute("src") : "";

    // Icon already set (maybe on SSR)
    if (oldSrc === this.scope.src) {
      return;
    }

    await this.loadIcon(this.scope.src);

    const newSvg = this.getSvg();
    if (newSvg) {
      newSvg.setAttribute("src", this.scope.src);
    }
  }

  protected removeColor() {
    this.className = this.className.replace(/(^|\s)text-\S+/g, "");
    this.style.color = "";
  }

  protected setColor(color?: string) {
    if (!color) {
      return this.removeColor();
    }
    if (color.includes(",")) {
      const colorArr = color.split(",");
      if (colorArr.length > 0) {
        this.className = this.className.replace(/(^|\s)text-\S+/g, "");
        for (let i = 0; i < colorArr.length; i++) {
          const newColor: string = colorArr[i];
          if (newColor.startsWith("#") || newColor.startsWith("rgb")) {
            this.style.color = newColor;
          }
          this.classList.add(`text-${newColor}`);
        }
      }
    } else {
      this.style.color = color;
      this.className = this.className.replace(/(^|\s)text-\S+/g, "");
      this.classList.add(`text-${color}`);
    }
  }

  protected setSize(size: number) {
    this.style.height = size + "px";
    this.style.width = size + "px";
    this.className = this.className.replace(/(^|\s)size-\S+/g, "");
    this.classList.add(`size-${size}`);
  }

  protected setWidth(width: number) {
    this.style.width = width + "px";
    this.className = this.className.replace(/(^|\s)w-\S+/g, "");
    this.classList.add(`w-${width}`);
  }

  protected setHeight(height: number) {
    this.style.height = height + "px";
    this.className = this.className.replace(/(^|\s)h-\S+/g, "");
    this.classList.add(`h-${height}`);
  }

  protected setDirection(direction: string) {
    let classString = `direction-${direction}`;
    if (direction === "left") {
      classString += " rotate-270";
    } else if (
      direction === "left-top" ||
      direction === "left-up" ||
      direction === "top-left" ||
      direction === "up-left"
    ) {
      classString += " rotate-315";
    } else if (direction === "top" || direction === "up") {
      classString += " rotate-0";
    } else if (
      direction === "top-right" ||
      direction === "up-right" ||
      direction === "right-top" ||
      direction === "right-up"
    ) {
      classString += " rotate-45";
    } else if (direction === "right") {
      classString += " rotate-90";
    } else if (
      direction === "right-bottom" ||
      direction === "right-down" ||
      direction === "bottom-right" ||
      direction === "down-right"
    ) {
      classString += " rotate-135";
    } else if (direction === "bottom" || direction === "down") {
      classString += " rotate-180";
    } else if (
      direction === "left-bottom" ||
      direction === "left-down" ||
      direction === "bottom-left" ||
      direction === "down-left"
    ) {
      classString += " rotate-225";
    }

    this.className = this.className.replace(/(^|\s)direction-\S+/g, "");
    this.className = this.className.replace(/(^|\s)rotate-\S+/g, "");
    this.className += " " + classString;
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
