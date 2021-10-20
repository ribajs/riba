import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { loadScript } from "@ribajs/utils";
import { DEFAULT_MAIN_PLAYER_ID, DEFAULT_POLYFILLS_URL, DEFAULT_WEB_PLAYER_URL, DEFAULT_POLYFILLS_SCRIPT_ID, DEFAULT_WEB_PLAYER_SCRIPT_ID } from "../../constants";

import type {
  PodloveWebPlayerComponentScope,
  PodloveWebPlayerStore,
} from "../../types";



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
        DEFAULT_POLYFILLS_SCRIPT_ID,
        true,
        true
      );
    }
  }

  protected setId() {
    if(!this.id) {
      this.id = DEFAULT_MAIN_PLAYER_ID;
    }
  }

  protected async loadPlayer() {
    await loadScript(
      DEFAULT_WEB_PLAYER_URL,
      DEFAULT_WEB_PLAYER_SCRIPT_ID,
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
    this.setId();
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
