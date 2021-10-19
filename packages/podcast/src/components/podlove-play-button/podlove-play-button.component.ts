import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { requestPause, requestPlay, selectEpisode } from "../../mixins/actions.mixins";
import type {
  PodlovePlayButtonComponentScope,
  PodloveWebPlayerStore,
} from "../../types";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";

const PLAY_ICON = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" background="currentColor" aria-hidden="true"><path d="M6 5.76341C6 5.19411 6.60936 4.83238 7.10914 5.10498L18.5429 11.3416C19.064 11.6258 19.064 12.3742 18.5429 12.6584L7.10914 18.895C6.60936 19.1676 6 18.8059 6 18.2366V5.76341Z" rv-style-fill="styles.play.color"></path></svg>`;
const TEMPLATE = `
<img class="poster" rv-if="episode.poster | or episode.show.poster" rv-src="episode.poster | or episode.show.poster" />
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
    return ["episode", "config", "web-player-id", "play-label"];
  }

  protected requiredAttributes(): string[] {
    return ["episode", "config", "web-player-id"];
  }

  public store?: PodloveWebPlayerStore;

  public scope: PodlovePlayButtonComponentScope = {
    episode: "",
    config: "",
    webPlayerId: "",
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

  protected initConfigs() {
    if (typeof this.scope.episode === 'string') {
      throw new Error('TODO');
    }
    if (typeof this.scope.config === 'string') {
      throw new Error('TODO');
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
      fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
    }

    const infoSubtitle = {
      fontFamily: this.scope.config.theme.fonts.regular.family.join(', '),
    }

    this.scope.styles['play'] = playBtn;
    this.scope.styles['infoName'] = infoName;
    this.scope.styles['infoTitle'] = infoTitle;
    this.scope.styles['infoSubtitle'] = infoSubtitle;
    
    this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
  }

  protected setWebPlayer() {
    const webPlayerEl = document.getElementById(this.scope.webPlayerId) as PodloveWebPlayerComponent | null;
    if (!webPlayerEl) {
      console.error(`Web player element not found by id "${this.scope.webPlayerId}"!`);
      return;
    }
    this.player = webPlayerEl;
    return this.player;
  }

  protected addEventListeners() {
    this.addEventListener("click", this.onClick);
  }

  protected _onClick() {
    console.debug("on play", this.scope.episode);
    if (!this.player) {
      console.error("The web player element is required!");
      return
    }
    if (!this.player.store) {
      console.error("The web player store is not ready!");
      return
    }
    
    const { lastAction } = this.player.store.getState();
    console.debug("player lastAction", lastAction);
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

    console.debug("index", index);

    return index;
  
  }

  /**
   * 
   * @see https://github.com/podlove/podlove-ui/blob/release/5.7.1/apps/player/src/components/tab-playlist/components/A11y.vue
   */
  protected selectEpisode(index: number) {

    console.debug("on play", this.scope.episode);
    if (!this.player) {
      console.error("The web player element is required!");
      return
    }
    if (!this.player.store) {
      console.error("The web player store is not ready!");
      return
    }

    const store = this.player.store;
    store.dispatch(requestPause());
    store.dispatch(selectEpisode({ index: index, play: true }))
    return store.dispatch(requestPlay());
  }

  protected onClick = this._onClick.bind(this);

  protected async afterBind() {
    await super.afterBind();
    this.setWebPlayer();
    this.initConfigs();
    this.addEventListeners();
  }

  protected async afterAllBind() {
    await super.afterAllBind();
    this.setWebPlayer();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return TEMPLATE;
    } else {
      return null;
    }
  }
}
