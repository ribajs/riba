import { Component, TemplateFunction } from "@ribajs/core";
import { PodloveWebPlayerComponentScope } from "../../types";
import { hasChildNodesTrim, loadScript, getUID } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

export class PodloveWebPlayerComponent extends Component {
  public static tagName = "podlove-web-player";

  public static loadingClass = "podlove-web-player-loading";
  public static readyClass = "podlove-web-player-ready";

  protected routerEvents?: EventDispatcher;

  static get observedAttributes() {
    return ["episode", "config"];
  }

  protected requiredAttributes(): string[] {
    return ["episode", "config"];
  }

  public scope: PodloveWebPlayerComponentScope = {
    selector: "#podlove-web-player",
    id: "podlove-web-player",
    episode: "",
    config: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.setLoadingClass(true);
    this.routerEvents = new EventDispatcher("main");
    this.routerEvents.on("newPageReady", this.onNewPageReady, this);
    this.init(PodloveWebPlayerComponent.observedAttributes);
  }

  protected disconnectedCallback() {
    if (this.bound && this.view) {
      this.unbind();
    }
    this.innerHTML = "";
    this.templateLoaded = false;
    super.disconnectedCallback();
  }

  protected onNewPageReady() {
    console.debug("newPageReady");
  }

  protected setLoadingClass(loading: boolean) {
    if (loading) {
      this.classList.add(PodloveWebPlayerComponent.loadingClass);
      this.classList.remove(PodloveWebPlayerComponent.readyClass);
    } else {
      this.classList.remove(PodloveWebPlayerComponent.loadingClass);
      this.classList.add(PodloveWebPlayerComponent.readyClass);
    }
  }

  protected async maybeLoadPolyfills() {
    // Legacy Browsers Polyfill
    const modernBrowser = "fetch" in window && "assign" in Object;

    if (!modernBrowser) {
      await loadScript(
        "//cdn.podlove.org/web-player/5.x/polyfills.js",
        "podlove-web-player-polyfills-5-x",
        true,
        true
      );
    }
  }

  protected async loadPlayer() {
    await loadScript(
      "//cdn.podlove.org/web-player/5.x/embed.js",
      "podlove-web-player-5-x",
      true,
      true
    );

    if (!window.podlovePlayer) {
      throw new Error("Can't load Podlove Web Player");
    }

    /* const store =*/ await window.podlovePlayer(
      this.scope.selector,
      this.scope.episode,
      this.scope.config
    );

    this.setLoadingClass(false);

    // store.subscribe(() => {
    //   const { lastAction } = store.getState();
    //   console.debug("lastAction", lastAction);
    // });
  }

  protected async beforeTemplate() {
    this.scope.id = getUID(this.scope.id + "-");
    this.scope.selector = "#" + this.scope.id;
  }

  protected async beforeBind() {
    await super.beforeBind();
    await this.maybeLoadPolyfills();
    await this.loadPlayer();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return `<div id="${this.scope.id}"></div>`;
    } else {
      return null;
    }
  }
}
