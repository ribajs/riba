import { Component } from "@ribajs/core";
import { ImageEvent } from "@ribajs/extras";
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

  public log(eventName: string, event: ImageEvent) {
    console.info(eventName, event);
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName}</span>`;
      const detail = event.detail;
      if (detail.image?.isLoaded !== undefined) {
        html += `<span class="detail">(isLoaded: ${detail.image?.isLoaded})</span>`;
      }
      html +=
        '<span class="time">' + new Date().toLocaleTimeString() + "</span></p>";
      this.consoleElement.insertAdjacentHTML("afterbegin", html);
    }
  }

  public changeImage() {
    this.scope.imageSource = `https://picsum.photos/5000/1000?random=${Math.random()}`;
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
