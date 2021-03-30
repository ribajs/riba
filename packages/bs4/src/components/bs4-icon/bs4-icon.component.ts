import { BasicComponent, TemplateFunction } from "@ribajs/core";

export class Bs4IconComponent extends BasicComponent {
  public static tagName = "bs4-icon";

  static get observedAttributes(): string[] {
    return ["size", "width", "height", "src", "color", "direction"];
  }

  protected scope: any = {};

  constructor() {
    super();
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
      if (fetch) {
        fetch(newValue)
          .then((response) => {
            // console.debug('response.headers.get("content-type")', response.headers.get('content-type'));
            if (response.status !== 200) {
              console.error(response.statusText);
              return "";
            }
            if (
              response.headers.get("content-type")?.indexOf("image/svg+xml") !==
              -1
            ) {
              return response.text();
            } else {
              console.error(
                "[bs4-icon] Only svg's are supported! But content-type is " +
                  response.headers.get("content-type")
              );
            }
            return "";
          })
          .then((response) => {
            this.innerHTML = response;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    if (name === "title") {
      const title = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title"
      );
      title.textContent = newValue;

      const svg = this.firstElementChild;
      if (svg) {
        svg.appendChild(title);
      }
    }

    if (name === "color") {
      if (newValue.indexOf(",") !== -1) {
        newValue = newValue.split(",");
        if (newValue.length > 0) {
          this.className = this.className.replace(/(^|\s)color-\S+/g, "");
          for (let i = 0; i < newValue.length; i++) {
            const newColor: string = newValue[i];
            if (newColor.startsWith("#") || newColor.startsWith("rgb")) {
              this.style.color = newColor;
            }
            this.classList.add(`color-${newColor}`);
          }
        }
      } else {
        this.style.color = newValue;
        this.className = this.className.replace(/(^|\s)color-\S+/g, "");
        this.classList.add(`color-${newValue}`);
      }
    }

    if (name === "size") {
      const size = newValue;
      this.style.height = size + "px";
      this.style.width = size + "px";
      this.className = this.className.replace(/(^|\s)size-\S+/g, "");
      this.classList.add(`size-${size}`);
    }

    if (name === "width") {
      const width = newValue;
      this.style.width = width + "px";
      this.className = this.className.replace(/(^|\s)width-\S+/g, "");
      this.classList.add(`width-${width}`);
    }

    if (name === "height") {
      const height = newValue;
      this.style.height = height + "px";
      this.className = this.className.replace(/(^|\s)height-\S+/g, "");
      this.classList.add(`height-${height}`);
    }

    if (name === "direction") {
      const direction = newValue;
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
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("role", "img");
    this.classList.add("iconset");
    this.init(Bs4IconComponent.observedAttributes);
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

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
