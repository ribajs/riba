import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class ExtrasImageEventsExampleComponent extends Component {
  public static tagName = "rv-extras-image-events-example";

  protected autobind = true;

  protected consoleElement: HTMLDivElement | null = null;

  public scope = {
    log: this.log,
    changeImage: this.changeImage,
    imageSource: "https://picsum.photos/5000/1000?random=1",
  };

  constructor() {
    super();
  }

  public log(eventName: string, event: Event) {
    console.info(eventName, event);
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName}</span>`;
      html +=
        '<span class="time">' + new Date().toLocaleTimeString() + "</span></p>";
      this.consoleElement.insertAdjacentHTML("afterbegin", html);
    }
  }

  protected getRandomImage() {
    const rand = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/5000/1000?random=${rand}`;
  }

  public changeImage() {
    this.scope.imageSource = this.getRandomImage();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.consoleElement = this.querySelector(".console");
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./image-events-example.component.html?raw"
      );
      return template;
    }
  }
}
