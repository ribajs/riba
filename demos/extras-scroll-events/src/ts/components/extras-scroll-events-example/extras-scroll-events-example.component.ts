import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class ExtrasScrollEventsExampleComponent extends Component {
  public static tagName = "rv-extras-scroll-events-example";

  protected autobind = true;

  protected consoleElement: HTMLDivElement | null = null;
  protected touchZoneElement: HTMLDivElement | null = null;

  public scope: any = {
    log: this.log,
  };

  constructor() {
    super();
  }

  public log(eventName: string, event: Event) {
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName}</span>`;
      const detail = (event as CustomEvent).detail;
      if (detail && detail.position) {
        html += `<span class="detail">(x: ${detail.position.x} y: ${detail.position.y} maxX: ${detail.position.maxX} maxY: ${detail.position.maxY})</span>`;
      }
      html +=
        '<span class="time">' + new Date().toLocaleTimeString() + "</span></p>";
      this.consoleElement.insertAdjacentHTML("afterbegin", html);
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.consoleElement = this.querySelector(".console");
    this.touchZoneElement = this.querySelector(".touch-zone");
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./extras-scroll-events-example.component.html"
      );
      return template;
    }
  }
}
