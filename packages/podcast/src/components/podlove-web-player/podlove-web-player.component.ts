import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { loadScript } from "@ribajs/utils/src/index.js";
import { getPlayerConfig } from "../../mixins/config.mixins.js";
import {
  DEFAULT_MAIN_PLAYER_ID,
  DEFAULT_POLYFILLS_URL,
  DEFAULT_WEB_PLAYER_URL,
  DEFAULT_POLYFILLS_SCRIPT_ID,
  DEFAULT_WEB_PLAYER_SCRIPT_ID,
  LOADING_CLASS,
  READY_CLASS,
  HAS_PLAYED_CLASS,
} from "../../constants.js";

import type {
  PodloveWebPlayerComponentScope,
  PodloveWebPlayerStore,
  PodloveWebPlayerStoreAction,
} from "../../types/index.js";

export class PodloveWebPlayerComponent extends Component {
  public static tagName = "podlove-web-player";

  protected _template = "";

  static get observedAttributes() {
    return ["episode-url", "config-url", "episode", "config"];
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public store?: PodloveWebPlayerStore;

  public scope: PodloveWebPlayerComponentScope = {
    episode: undefined,
    config: undefined,
    episodeUrl: "",
    configUrl: "",
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
      this.classList.add(LOADING_CLASS);
      this.classList.remove(READY_CLASS);
    } else {
      this.classList.remove(LOADING_CLASS);
      this.classList.add(READY_CLASS);
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
    if (!this.id) {
      this.id = DEFAULT_MAIN_PLAYER_ID;
    }
  }

  protected async loadConfig() {
    if (this.scope.configUrl && !this.scope.config) {
      const response = await getPlayerConfig(this.scope.configUrl);
      this.scope.config = response.body;
    }
  }

  protected async initConfig() {
    await this.loadConfig();

    if (typeof this.scope.config !== "object") {
      throw new Error(
        `The podlove config object must be of type "object"!\n${JSON.stringify(
          this.scope.config
        )}`
      );
    }

    this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
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

    const store = await window.podlovePlayer(
      this,
      this.scope.episode || this.scope.episodeUrl,
      this.scope.config || this.scope.configUrl
    );

    this.store = store;

    this.setLoadingClass(false);

    this.store.subscribe(() => {
      const { lastAction } = store.getState();
      if (lastAction?.type === "PLAYER_REQUEST_PLAY") {
        this.onPlay(lastAction);
      }
    });
  }

  protected onPlay(action: PodloveWebPlayerStoreAction) {
    this.debug("onPlay", action);
    this.classList.add(HAS_PLAYED_CLASS);
  }

  protected async beforeBind() {
    await super.beforeBind();
    await this.initConfig();
  }

  protected async afterBind() {
    await super.afterBind();
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
