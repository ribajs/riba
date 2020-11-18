import { BasicComponent } from "@ribajs/core";

export class Bs4IconComponent extends BasicComponent {
  public static tagName = "bs4-icon";

  static get observedAttributes() {
    return ["size", "width", "height", "src", "color", "direction"];
  }

  protected scope: any = {};

  constructor(element?: HTMLElement) {
    super(element);
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
            this.el.innerHTML = response;
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

      const svg = this.el.firstElementChild;
      if (svg) {
        svg.appendChild(title);
      }
    }

    if (name === "color") {
      if (newValue.indexOf(",") !== -1) {
        newValue = newValue.split(",");
        if (newValue.length > 0) {
          this.el.className = this.el.className.replace(/(^|\s)color-\S+/g, "");
          for (let i = 0; i < newValue.length; i++) {
            const newColor: string = newValue[i];
            if (newColor.startsWith("#") || newColor.startsWith("rgb")) {
              this.el.style.color = newColor;
            }
            this.el.classList.add(`color-${newColor}`);
          }
        }
      } else {
        this.el.style.color = newValue;
        this.el.className = this.el.className.replace(/(^|\s)color-\S+/g, "");
        this.el.classList.add(`color-${newValue}`);
      }
    }

    if (name === "size") {
      const size = newValue;
      this.el.style.height = size + "px";
      this.el.style.width = size + "px";
      this.el.className = this.el.className.replace(/(^|\s)size-\S+/g, "");
      this.el.classList.add(`size-${size}`);
    }

    if (name === "width") {
      const width = newValue;
      this.el.style.width = width + "px";
      this.el.className = this.el.className.replace(/(^|\s)width-\S+/g, "");
      this.el.classList.add(`width-${width}`);
    }

    if (name === "height") {
      const height = newValue;
      this.el.style.height = height + "px";
      this.el.className = this.el.className.replace(/(^|\s)height-\S+/g, "");
      this.el.classList.add(`height-${height}`);
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

      this.el.className = this.el.className.replace(/(^|\s)direction-\S+/g, "");
      this.el.className = this.el.className.replace(/(^|\s)rotate-\S+/g, "");
      this.el.className += " " + classString;
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.el.setAttribute("aria-hidden", "true");
    this.el.setAttribute("role", "img");
    this.el.classList.add("iconset");
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

  protected template() {
    return null;
  }
}
