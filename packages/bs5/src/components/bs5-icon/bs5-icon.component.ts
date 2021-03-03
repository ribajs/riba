import { BasicComponent } from "@ribajs/core";

export class Bs5IconComponent extends BasicComponent {
  public static tagName = "bs5-icon";

  static get observedAttributes() {
    return ["size", "width", "height", "src", "color", "direction"];
  }

  protected scope: any = {};

  constructor() {
    super();
  }

  protected getSvg() {
    return this.querySelector("svg");
  }

  protected async fetchIcon(src: string) {
    if (!fetch) {
      return "";
    }

    let response: Response;

    // Append hostname on ssr
    if (
      window?.ssr?.ctx &&
      !src.startsWith("http") &&
      !src.startsWith("ftp") &&
      !src.startsWith("sftp")
    ) {
      const url = new URL(
        src,
        window.ssr.ctx.protocol + "://" + window.ssr.ctx.hostname
      );
      response = await fetch(url.href);
    } else {
      response = await fetch(src);
    }

    if (response.status !== 200) {
      console.error(response.statusText);
      return "";
    }

    if (response.headers.get("content-type")?.includes("image/svg+xml")) {
      return response.text();
    }

    console.error(
      "[bs5-icon] Only svg's are supported! But content-type is " +
        response.headers.get("content-type")
    );
    return "";
  }

  protected async onSrcChanged() {
    let icon = "";

    if (!this.scope.src) {
      console.error("Src is not set!");
      return;
    }

    let currentSvg = this.getSvg();
    let oldSrc = currentSvg ? currentSvg.getAttribute("src") : "";

    // Icon already set (maybe on SSR)
    if (oldSrc === this.scope.src) {
      return;
    }

    icon = await this.fetchIcon(this.scope.src);

    if (!icon) {
      console.error("Error on fetch icon!");
      return;
    }

    this.innerHTML = icon;
    const newSvg = this.getSvg();
    if (newSvg) {
      newSvg.setAttribute("src", this.scope.src);
    }
  }

  protected setColor(color: string) {
    if (color.includes(",")) {
      const colorArr = color.split(",");
      if (colorArr.length > 0) {
        this.className = this.className.replace(/(^|\s)color-\S+/g, "");
        for (let i = 0; i < colorArr.length; i++) {
          const newColor: string = colorArr[i];
          if (newColor.startsWith("#") || newColor.startsWith("rgb")) {
            this.style.color = newColor;
          }
          this.classList.add(`color-${newColor}`);
        }
      }
    } else {
      this.style.color = color;
      this.className = this.className.replace(/(^|\s)color-\S+/g, "");
      this.classList.add(`color-${color}`);
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
    this.className = this.className.replace(/(^|\s)width-\S+/g, "");
    this.classList.add(`width-${width}`);
  }

  protected setHeight(height: number) {
    this.style.height = height + "px";
    this.className = this.className.replace(/(^|\s)height-\S+/g, "");
    this.classList.add(`height-${height}`);
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

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    if (name === "src") {
      if (!newValue) {
        console.warn("The src attribute must have a value!", this.scope);
        return "";
      }
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

  protected connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("role", "img");
    this.classList.add("iconset");
    this.init(Bs5IconComponent.observedAttributes);
    // set default values
    if (!this.scope.direction) {
      this.scope.direction = "up";
      this.attributeChangedCallback(
        "direction",
        null,
        this.scope.direction,
        null
      );
    }
  }

  protected template() {
    return null;
  }
}
