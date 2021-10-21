import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { waitForProp } from "@ribajs/utils/src/control";
import template from "./podlove-fixed-web-player.component.template";
import type {
  PodloveWebPlayerEpisode,
  PodloveWebPlayerConfig,
} from "../../types";
import { DEFAULT_MAIN_PLAYER_ID } from '../../constants';
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";
import type {
  PodloveWebPlayerStore,
} from "../../types";


export interface Scope {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
  playerId: string;
  position: 'top' | 'bottom';
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
    position: 'bottom',
  };

  static get observedAttributes(): string[] {
    return ["player-id", "episode-url", "config-url", "episode", "config", "position"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PodloveFixedWebPlayerComponent.observedAttributes);
  }

  protected async initWebPlayer() {
    const webPlayerEl = document.getElementById(this.scope.playerId) as PodloveWebPlayerComponent | null;
    this.player = webPlayerEl || undefined;

    if (!this.player) {
      console.error(`Web player element not found by id "${this.scope.playerId}"!`);
      return;
    }

    const store = await waitForProp<PodloveWebPlayerStore>('store', this.player, 100);

    if (!store) {
      console.error(`Web player not ready!`);
      return;
    }

    this.store = store;

    store.subscribe(() => {
      const { lastAction } = store.getState();
      this.debug("lastAction", lastAction);
      if (lastAction?.type === 'PLAYER_REQUEST_PLAY') {
        if (this.scope.position === 'bottom') {
          document.body.style.marginBottom = "139px";
        }
        if (this.scope.position === 'top') {
          document.body.style.marginTop = "139px";
        }
      }
    });

    return this.player;
  }

  protected async afterBind() {
    await super.afterBind();
    await this.initWebPlayer();
  }

  protected template() {
    if (!hasChildNodesTrim(this)) {
      return template;
    } else {
      return null;
    }
  }
}
