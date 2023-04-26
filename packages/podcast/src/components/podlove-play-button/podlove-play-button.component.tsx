import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { waitForProp } from "@ribajs/utils/src/control.js";
import { requestPlay, selectEpisode } from "../../mixins/actions.mixins.js";
import {
  getEpisodeConfig,
  getPlayerConfig,
} from "../../mixins/config.mixins.js";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants.js";

import type {
  PodlovePlayButtonComponentScope,
  PodloveWebPlayerStore,
} from "../../types/index.js";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component.js";
// import TEMPLATE from "./podlove-play-button.component.template.js";

const PLAY_ICON = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" background="currentColor" aria-hidden="true"><path d="M6 5.76341C6 5.19411 6.60936 4.83238 7.10914 5.10498L18.5429 11.3416C19.064 11.6258 19.064 12.3742 18.5429 12.6584L7.10914 18.895C6.60936 19.1676 6 18.8059 6 18.2366V5.76341Z" rv-style-fill="styles.play.color"></path></svg>`;

export class PodlovePlayButtonComponent extends Component {
  public static tagName = "podlove-play-button";

  protected player?: PodloveWebPlayerComponent;
  public _debug = false;

  static get observedAttributes() {
    return [
      "episode",
      "config",
      "episode-url",
      "config-url",
      "web-player-id",
      "play-label",
      "id",
    ];
  }

  protected requiredAttributes(): string[] {
    return ["web-player-id"];
  }

  public store?: PodloveWebPlayerStore;

  public scope: PodlovePlayButtonComponentScope = {
    episode: undefined,
    config: undefined,
    episodeUrl: "",
    configUrl: "",
    webPlayerId: DEFAULT_MAIN_PLAYER_ID,
    playLabel: "",
    styles: {
      play: null,
      infoName: null,
      infoTitle: null,
    },
    icons: {
      play: PLAY_ICON,
    },
    play: this.play,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PodlovePlayButtonComponent.observedAttributes);
  }

  protected async loadConfigs() {
    if (this.scope.episodeUrl && !this.scope.episode) {
      const response = await getEpisodeConfig(this.scope.episodeUrl);
      this.scope.episode = response.body;
    }
    if (this.scope.configUrl && !this.scope.config) {
      const response = await getPlayerConfig(this.scope.configUrl);
      this.scope.config = response.body;
    }
  }

  protected async initConfigs() {
    await this.loadConfigs();

    if (typeof this.scope.config !== "object") {
      throw new Error(`The podlove config object must be of type "object"!`);
    }
    if (typeof this.scope.episode !== "object") {
      throw new Error(`The episode object must be of type "object"!`);
    }

    const playBtn = {
      backgroundColor: this.scope.config.theme.tokens.brandDark,
      color: this.scope.config.theme.tokens.brandLightest,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(", "),
    };

    const infoName = {
      color: this.scope.config.theme.tokens.brand,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(", "),
    };

    const infoTitle = {
      color: this.scope.config.theme.tokens.contrast,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(", "),
    };

    const infoSubtitle = {
      color: this.scope.config.theme.tokens.contrast,
      fontFamily: this.scope.config.theme.fonts.regular.family.join(", "),
    };

    this.scope.styles["play"] = playBtn;
    this.scope.styles["infoName"] = infoName;
    this.scope.styles["infoTitle"] = infoTitle;
    this.scope.styles["infoSubtitle"] = infoSubtitle;

    this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
  }

  protected async initWebPlayer() {
    const webPlayerEl = document.getElementById(
      this.scope.webPlayerId
    ) as PodloveWebPlayerComponent | null;
    this.player = webPlayerEl || undefined;

    if (!this.player) {
      console.error(
        `Web player element not found by id "${this.scope.webPlayerId}"!`
      );
      return;
    }

    return this.player;
  }

  public async play() {
    this.debug("play", this.player);
    const index = this.getEpisodePlaylistIndex();
    await this.selectEpisode(index);
  }

  protected getEpisodePlaylistIndex() {
    if (typeof this.scope.config !== "object") {
      throw new Error(
        `The podlove config object must be of type "object"!\n${JSON.stringify(
          this.scope.config
        )}`
      );
    }
    if (typeof this.scope.episode !== "object") {
      throw new Error(
        `The episode object must be of type "object"!\n${JSON.stringify(
          this.scope.episode
        )}`
      );
    }

    const title = this.scope.episode.title;
    const playlist = this.scope.config.playlist;

    if (!playlist) {
      throw new Error(
        `Playlist is required to change the episode over the play button component!\n${JSON.stringify(
          playlist
        )}`
      );
    }

    let index = -1;

    for (let i = 0; i < playlist.length; i++) {
      const playlistEp = playlist[i];
      if (playlistEp.title === title) {
        index = i;
        break;
      }
    }

    if (index <= -1) {
      throw new Error("Episode not found in playlist!");
    }

    return index;
  }

  /**
   *
   * @see https://github.com/podlove/podlove-ui/blob/release/5.7.1/apps/player/src/components/tab-playlist/components/A11y.vue
   */
  protected async selectEpisode(index: number) {
    if (!this.player) {
      console.error("The web player element is required!");
      return;
    }

    const store = await waitForProp<PodloveWebPlayerStore>(
      "store",
      this.player,
      100
    );

    if (!store) {
      console.error("The web player store is not ready!");
      return;
    }

    if (!this.player.store) {
      console.error("The web player store is not ready!");
      return;
    }

    // store.subscribe(() => {
    //   const { lastAction } = store.getState();
    //   this.debug("lastAction", lastAction);
    // });

    store.dispatch(selectEpisode({ index: index, play: true }));
    return store.dispatch(requestPlay());
  }

  protected async afterBind() {
    try {
      await super.afterBind();
      await this.initConfigs();
      await this.initWebPlayer();
    } catch (error) {
      this.scope.error = error;
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return (
        <>
          <div class="poster" rv-if="episode.poster | or episode.show.poster">
            <img src="" rv-src="episode.poster | or episode.show.poster" />
          </div>
          <div class="info">
            <div class="header">
              <h1
                class="name"
                rv-style="styles.infoName"
                rv-text="episode.show.title"
              ></h1>
              <h1
                class="title"
                rv-style="styles.infoTitle"
                rv-text="episode.title"
              ></h1>
              <p
                class="subtitle"
                rv-style="styles.infoSubtitle"
                rv-text="episode.subtitle"
              ></p>
              <div rv-if="error">
                <pre>
                  <code rv-text="error"></code>
                </pre>
              </div>
            </div>
            <div class="controls">
              <button
                class="play"
                rv-on-click="play"
                rv-style="styles.play"
                rv-class-has-label="playLabel"
              >
                <span rv-template="icons.play"></span>
                <span rv-text="playLabel"></span>
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}
