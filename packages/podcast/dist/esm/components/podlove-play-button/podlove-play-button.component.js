import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { requestPause, requestPlay, selectEpisode } from "../../mixins/actions.mixins";
import { getEpisodeConfig, getPlayerConfig } from "../../mixins/config.mixins";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants";
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
    static tagName = "podlove-play-button";
    player;
    static get observedAttributes() {
        return ["episode", "config", "web-player-id", "play-label", "id"];
    }
    requiredAttributes() {
        return ["episode", "config", "web-player-id"];
    }
    store;
    scope = {
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
    connectedCallback() {
        super.connectedCallback();
        this.init(PodlovePlayButtonComponent.observedAttributes);
    }
    async initConfigs() {
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
        };
        const infoName = {
            color: this.scope.config.theme.tokens.brand,
            fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
        };
        const infoTitle = {
            color: this.scope.config.theme.tokens.contrast,
            fontFamily: this.scope.config.theme.fonts.bold.family.join(', '),
        };
        const infoSubtitle = {
            color: this.scope.config.theme.tokens.contrast,
            fontFamily: this.scope.config.theme.fonts.regular.family.join(', '),
        };
        this.scope.styles['play'] = playBtn;
        this.scope.styles['infoName'] = infoName;
        this.scope.styles['infoTitle'] = infoTitle;
        this.scope.styles['infoSubtitle'] = infoSubtitle;
        this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
    }
    setWebPlayer() {
        const webPlayerEl = document.getElementById(this.scope.webPlayerId);
        if (!webPlayerEl) {
            console.error(`Web player element not found by id "${this.scope.webPlayerId}"!`);
            return;
        }
        this.player = webPlayerEl;
        return this.player;
    }
    addEventListeners() {
        this.addEventListener("click", this.onClick);
    }
    _onClick() {
        if (!this.player) {
            console.error("The web player element is required!");
            return;
        }
        if (!this.player.store) {
            console.error("The web player store is not ready!");
            return;
        }
        const index = this.getEpisodePlaylistIndex();
        this.selectEpisode(index);
    }
    getEpisodePlaylistIndex() {
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
    selectEpisode(index) {
        if (!this.player) {
            console.error("The web player element is required!");
            return;
        }
        if (!this.player.store) {
            console.error("The web player store is not ready!");
            return;
        }
        const store = this.player.store;
        store.dispatch(requestPause());
        store.dispatch(selectEpisode({ index: index, play: true }));
        return store.dispatch(requestPlay());
    }
    onClick = this._onClick.bind(this);
    async afterBind() {
        await super.afterBind();
        await this.initConfigs();
        this.setWebPlayer();
        this.addEventListeners();
    }
    template() {
        if (!hasChildNodesTrim(this)) {
            return TEMPLATE;
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1wbGF5LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wb2Rsb3ZlLXBsYXktYnV0dG9uL3BvZGxvdmUtcGxheS1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVF6RCxNQUFNLFNBQVMsR0FBRywwV0FBMFcsQ0FBQztBQUM3WCxNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQmhCLENBQUM7QUFFRixNQUFNLE9BQU8sMEJBQTJCLFNBQVEsU0FBUztJQUNoRCxNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO0lBRXBDLE1BQU0sQ0FBNkI7SUFFN0MsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLEtBQUssQ0FBeUI7SUFFOUIsS0FBSyxHQUFvQztRQUM5QyxPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO1FBQ1YsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxTQUFTO1NBQ2hCO0tBQ0YsQ0FBQztJQUVGO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRVMsS0FBSyxDQUFDLFdBQVc7UUFDekIsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztTQUNwQztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDekMsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ25DO1FBRUQsTUFBTSxPQUFPLEdBQUc7WUFDZCxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ3pELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWE7WUFDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pFLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRztZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pFLENBQUE7UUFFRCxNQUFNLFNBQVMsR0FBRztZQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqRSxDQUFBO1FBRUQsTUFBTSxZQUFZLEdBQUc7WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUM5QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEUsQ0FBQTtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUVqRCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUM1RSxDQUFDO0lBRVMsWUFBWTtRQUNwQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFxQyxDQUFDO1FBQ3hHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ2pGLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNyRCxPQUFNO1NBQ1A7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3BELE9BQU07U0FDUDtRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVTLHVCQUF1QjtRQUMvQixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUU1QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1NBQy9GO1FBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDOUIsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixNQUFNO2FBQ1A7U0FDRjtRQUVELElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBTVMsYUFBYSxDQUFDLEtBQWE7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ3JELE9BQU07U0FDUDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDcEQsT0FBTTtTQUNQO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFUyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkMsS0FBSyxDQUFDLFNBQVM7UUFDdkIsTUFBTSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEIsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFPUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUMifQ==