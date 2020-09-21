import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./touch-events-example.component.html";

export class TouchEventsExampleComponent extends Component {
  public static tagName = "rv-touch-events-example";

  protected autobind = true;

  protected consoleElement: HTMLDivElement | null = null;
  protected touchZoneElement: HTMLDivElement | null = null;

  protected scope: any = {
    log: this.log,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  public log(eventName: string, event: Event) {
    // console.debug(eventName + ' called', event.type, (event as any), (event as any).detail);
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
    return super.beforeBind().then(() => {
      this.consoleElement = this.el.querySelector(".console");
      this.touchZoneElement = this.el.querySelector(".touch-zone");
    });
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      return null;
    } else {
      return template;
    }
  }
}
