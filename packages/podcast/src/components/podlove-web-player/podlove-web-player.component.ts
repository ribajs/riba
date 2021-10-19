import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import {
  PodloveWebPlayerComponentScope,
  PodloveWebPlayerStore,
} from "../../types";
import { loadScript } from "@ribajs/utils";

const DEFAULT_POLYFILLS_URL = "//cdn.podlove.org/web-player/5.x/polyfills.js";
const DEFAULT_WEB_PLAYER_URL = "//cdn.podlove.org/web-player/5.x/embed.js";

export class PodloveWebPlayerComponent extends Component {
  public static tagName = "podlove-web-player";

  public static loadingClass = "podlove-web-player-loading";
  public static readyClass = "podlove-web-player-ready";

  protected _template = "";

  static get observedAttributes() {
    return ["episode", "config"];
  }

  protected requiredAttributes(): string[] {
    return ["episode", "config"];
  }

  public store?: PodloveWebPlayerStore;

  public scope: PodloveWebPlayerComponentScope = {
    episode: "",
    config: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.setLoadingClass(true);
    this.init(PodloveWebPlayerComponent.observedAttributes);
  }

  protected disconnectedCallback() {
    if (this.bound && this.view) {
      this.unbind();
    }
    this.innerHTML = this._template;
    this.templateLoaded = false;
    super.disconnectedCallback();
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
        DEFAULT_POLYFILLS_URL,
        "podlove-web-player-polyfills-5-x",
        true,
        true
      );
    }
  }

  protected async loadPlayer() {
    await loadScript(
      DEFAULT_WEB_PLAYER_URL,
      "podlove-web-player-5-x",
      true,
      true
    );

    if (!window.podlovePlayer) {
      throw new Error("Can't load Podlove Web Player");
    }

    this.store = await window.podlovePlayer(
      this,
      this.scope.episode,
      this.scope.config
    );

    this.setLoadingClass(false);

    // store.subscribe(() => {
    //   const { lastAction } = store.getState();
    //   console.debug("lastAction", lastAction);
    // });
  }

  protected async beforeBind() {
    await super.beforeBind();
    await this.maybeLoadPolyfills();
    await this.loadPlayer();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return this._template;
    } else {
      this._template = this.innerHTML;
      return null;
    }
  }
}
