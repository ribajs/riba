import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { waitForProp } from "@ribajs/utils/src/control";
import { requestPlay, selectEpisode } from "../../mixins/actions.mixins";
import { getEpisodeConfig, getPlayerConfig } from "../../mixins/config.mixins";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants";

import type {
  PodlovePlayButtonComponentScope,
  PodloveWebPlayerStore,
} from "../../types";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";

const PLAY_ICON = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" background="currentColor" aria-hidden="true"><path d="M6 5.76341C6 5.19411 6.60936 4.83238 7.10914 5.10498L18.5429 11.3416C19.064 11.6258 19.064 12.3742 18.5429 12.6584L7.10914 18.895C6.60936 19.1676 6 18.8059 6 18.2366V5.76341Z" rv-style-fill="styles.play.color"></path></svg>`;
const TEMPLATE = `
<div class="poster" rv-if="episode.poster | or episode.show.poster">
  <img rv-src="episode.poster | or episode.show.poster" />
</div>
<div class="info">
  <div class="header">
    <h1 class="name" rv-style="styles.infoName" rv-text="episode.show.title"></h1>
    <h1 class="title" rv-style="styles.infoTitle" rv-text="episode.title"></h1>
    <p class="subtitle" rv-style="styles.infoSubtitle" rv-text="episode.subtitle"></p>
  </div>
  <div class="controls">
    <button class="play" rv-style="styles.play" rv-class-has-label="playLabel">
      <span rv-template="icons.play"></span>
      <span rv-text="playLabel"></span>
    </button>
  </div>
</div>
`;

export class PodlovePlayButtonComponent extends Component {
  public static tagName = "podlove-play-button";

  protected player?: PodloveWebPlayerComponent;

  static get observedAttributes() {
    return ["episode", "config", "web-player-id", "play-label", "id"];
  }

  protected requiredAttributes(): string[] {
    return ["episode", "config", "web-player-id"];
  }

  public store?: PodloveWebPlayerStore;

  public scope: PodlovePlayButtonComponentScope = {
    episode: "",
    config: "",
    webPlayerId: DEFAULT_MAIN_PLAYER_ID,
    playLabel: "",
    styles: {
      play: null,
      infoName: null,
      infoTitle: null,
    },
    icons: {
      play: PLAY_ICON
    }
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PodlovePlayButtonComponent.observedAttributes);
  }

  protected async initConfigs() {
    if (typeof this.scope.episode === 'string') {
      const response = await getEpisodeConfig(this.scope.episode);
      this.scope.episode = response.body;
    }
    if (typeof this.scope.config === 'string') {
      const response = await getPlayerConfig(this.scope.config);
      this.scope.config = response.body;
    }

    const playBtn = {
      backgroundColor: this.scope.config.theme.tokens.brandDark,
      color: this.scope.config.theme.tokens.brandLightest,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
    }

    const infoName = {
      color: this.scope.config.theme.tokens.brand,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
    }

    const infoTitle = {
      color: this.scope.config.theme.tokens.contrast,
      fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
    }

    const infoSubtitle = {
      color: this.scope.config.theme.tokens.contrast,
      fontFamily: this.scope.config.theme.fonts.regular.family.join(', '),
    }

    this.scope.styles['play'] = playBtn;
    this.scope.styles['infoName'] = infoName;
    this.scope.styles['infoTitle'] = infoTitle;
    this.scope.styles['infoSubtitle'] = infoSubtitle;
    
    this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
  }

  protected async initWebPlayer() {
    const webPlayerEl = document.getElementById(this.scope.webPlayerId) as PodloveWebPlayerComponent | null;
    this.player = webPlayerEl || undefined;

    if (!this.player) {
      console.error(`Web player element not found by id "${this.scope.webPlayerId}"!`);
      return;
    }

    const store = await waitForProp<PodloveWebPlayerStore>('store', this.player);

    if (!store) {
      console.error(`Web player not ready!`);
      return;
    }

    // store.subscribe(() => {
    //   const { lastAction } = store.getState();
    //   console.debug("lastAction", lastAction);
    // });

    return this.player;
  }

  protected addEventListeners() {
    this.addEventListener("click", this.onClick);
  }

  protected _onClick() {
    if (!this.player) {
      console.error("The web player element is required!");
      return
    }
    if (!this.player.store) {
      console.error("The web player store is not ready!");
      return
    }
    const index = this.getEpisodePlaylistIndex();
    this.selectEpisode(index);
  }

  protected getEpisodePlaylistIndex() {
    if (typeof this.scope.config !== 'object') {
      throw new Error('The config object must be of type "object"!');
    }
    if (typeof this.scope.episode !== 'object') {
      throw new Error('The config object must be of type "object"!');
    }

    const title = this.scope.episode.title;
    const playlist = this.scope.config.playlist;

    if (!playlist) {
      throw new Error("Playlist is required to change the episode over the play button component!");
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
  protected selectEpisode(index: number) {
    if (!this.player) {
      console.error("The web player element is required!");
      return
    }
    if (!this.player.store) {
      console.error("The web player store is not ready!");
      return
    }

    const store = this.player.store;
    // store.dispatch(requestPause());
    store.dispatch(selectEpisode({ index: index, play: true }))
    return store.dispatch(requestPlay());
  }

  protected onClick = this._onClick.bind(this);

  protected async afterBind() {
    await super.afterBind();
    await this.initConfigs();
    await this.initWebPlayer();
    this.addEventListeners();
  }

  // protected async afterAllBind() {
  //   await super.afterAllBind();
  //   this.initWebPlayer();
  // }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return TEMPLATE;
    } else {
      return null;
    }
  }
}
