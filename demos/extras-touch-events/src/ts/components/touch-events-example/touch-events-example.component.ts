import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./touch-events-example.component.html";

export class TouchEventsExampleComponent extends Component {
  public static tagName = "rv-touch-events-example";

  protected autobind = true;

  protected consoleElement: HTMLDivElement | null = null;
  protected touchZoneElement: HTMLDivElement | null = null;

  public scope: any = {
    log: this.log
  };

  constructor() {
    super();
  }

  public log(eventName: string, event: Event) {
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName}</span>`;
      if ((event as any).detail && (event as any).detail.offset) {
        html += `<span class="detail">(X: ${
          (event as any).detail.offset.x
        } Y: ${(event as any).detail.offset.y})</span>`;
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

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
