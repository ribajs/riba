import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { waitForProp } from "@ribajs/utils/src/control.js";
import type {
  PodloveWebPlayerEpisode,
  PodloveWebPlayerConfig,
  PodloveWebPlayerStore,
} from "../../types/index.js";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants.js";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component.js";

export interface Scope extends ScopeBase {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
  playerId: string;
  position: "top" | "bottom";
  show: PodloveFixedWebPlayerComponent["show"];
  hide: PodloveFixedWebPlayerComponent["hide"];
}

export class PodloveFixedWebPlayerComponent extends Component {
  public static tagName = "podlove-fixed-web-player";
  public _debug = false;
  protected autobind = true;
  protected player?: PodloveWebPlayerComponent;
  protected store?: PodloveWebPlayerStore;

  scope: Scope = {
    episode: undefined,
    config: undefined,
    episodeUrl: "",
    configUrl: "",
    playerId: DEFAULT_MAIN_PLAYER_ID,
    position: "bottom",
    show: this.show,
    hide: this.hide,
  };

  static get observedAttributes(): string[] {
    return [
      "player-id",
      "episode-url",
      "config-url",
      "episode",
      "config",
      "position",
    ];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PodloveFixedWebPlayerComponent.observedAttributes);
  }

  protected async initWebPlayer() {
    const webPlayerEl = document.getElementById(
      this.scope.playerId,
    ) as PodloveWebPlayerComponent | null;
    this.player = webPlayerEl || undefined;

    if (!this.player) {
      console.error(
        `Web player element not found by id "${this.scope.playerId}"!`,
      );
      return;
    }

    const store = await waitForProp<PodloveWebPlayerStore>(
      "store",
      this.player,
      100,
    );

    if (!store) {
      console.error(`Web player not ready!`);
      return;
    }

    this.store = store;

    store.subscribe(() => {
      const { lastAction } = store.getState();
      this.debug("lastAction", lastAction);
      if (lastAction?.type === "PLAYER_REQUEST_PLAY") {
        this.show();
      }
    });

    return this.player;
  }

  public show() {
    if (this.player) {
      this.style.height = this.player.clientHeight + "px";
    }
    if (this.scope.position === "bottom") {
      document.body.style.marginBottom = "140px";
      this.style.bottom = "-15px";
    }
    if (this.scope.position === "top") {
      document.body.style.marginTop = "140px";
      this.style.top = "-15px";
    }
  }

  public hide() {
    if (this.scope.position === "bottom") {
      document.body.style.marginBottom = "";
      this.style.bottom = "-200px";
    }
    if (this.scope.position === "top") {
      document.body.style.marginTop = "";
      this.style.top = "-200px";
    }
  }

  protected async afterBind() {
    await super.afterBind();
    await this.initWebPlayer();
  }

  protected async template() {
    if (!hasChildNodesTrim(this)) {
      const { default: template } = await import(
        "./podlove-fixed-web-player.component.template.js"
      );
      return template;
    } else {
      return null;
    }
  }
}
