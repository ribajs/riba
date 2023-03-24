import { Component } from "@ribajs/core/src/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { waitForProp } from "@ribajs/utils/src/control.js";
import { requestPlay, selectEpisode } from "../../mixins/actions.mixins.js";
import { getEpisodeConfig, getPlayerConfig, } from "../../mixins/config.mixins.js";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants.js";
const PLAY_ICON = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" background="currentColor" aria-hidden="true"><path d="M6 5.76341C6 5.19411 6.60936 4.83238 7.10914 5.10498L18.5429 11.3416C19.064 11.6258 19.064 12.3742 18.5429 12.6584L7.10914 18.895C6.60936 19.1676 6 18.8059 6 18.2366V5.76341Z" rv-style-fill="styles.play.color"></path></svg>`;
class PodlovePlayButtonComponent extends Component {
    static tagName = "podlove-play-button";
    player;
    _debug = false;
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
    requiredAttributes() {
        return ["web-player-id"];
    }
    store;
    scope = {
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
    connectedCallback() {
        super.connectedCallback();
        this.init(PodlovePlayButtonComponent.observedAttributes);
    }
    async loadConfigs() {
        if (this.scope.episodeUrl && !this.scope.episode) {
            const response = await getEpisodeConfig(this.scope.episodeUrl);
            this.scope.episode = response.body;
        }
        if (this.scope.configUrl && !this.scope.config) {
            const response = await getPlayerConfig(this.scope.configUrl);
            this.scope.config = response.body;
        }
    }
    async initConfigs() {
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
    async initWebPlayer() {
        const webPlayerEl = document.getElementById(this.scope.webPlayerId);
        this.player = webPlayerEl || undefined;
        if (!this.player) {
            console.error(`Web player element not found by id "${this.scope.webPlayerId}"!`);
            return;
        }
        return this.player;
    }
    async play() {
        this.debug("play", this.player);
        const index = this.getEpisodePlaylistIndex();
        await this.selectEpisode(index);
    }
    getEpisodePlaylistIndex() {
        if (typeof this.scope.config !== "object") {
            throw new Error(`The podlove config object must be of type "object"!\n${JSON.stringify(this.scope.config)}`);
        }
        if (typeof this.scope.episode !== "object") {
            throw new Error(`The episode object must be of type "object"!\n${JSON.stringify(this.scope.episode)}`);
        }
        const title = this.scope.episode.title;
        const playlist = this.scope.config.playlist;
        if (!playlist) {
            throw new Error(`Playlist is required to change the episode over the play button component!\n${JSON.stringify(playlist)}`);
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
    async selectEpisode(index) {
        if (!this.player) {
            console.error("The web player element is required!");
            return;
        }
        const store = await waitForProp("store", this.player, 100);
        if (!store) {
            console.error("The web player store is not ready!");
            return;
        }
        if (!this.player.store) {
            console.error("The web player store is not ready!");
            return;
        }
        store.dispatch(selectEpisode({ index: index, play: true }));
        return store.dispatch(requestPlay());
    }
    async afterBind() {
        try {
            await super.afterBind();
            await this.initConfigs();
            await this.initWebPlayer();
        }
        catch (error) {
            this.scope.error = error;
        }
    }
    template() {
        if (!hasChildNodesTrim(this)) {
            return (jsxCreateElement(jsxFragment, null,
                jsxCreateElement("div", { class: "poster", "rv-if": "episode.poster | or episode.show.poster" },
                    jsxCreateElement("img", { src: "", "rv-src": "episode.poster | or episode.show.poster" })),
                jsxCreateElement("div", { class: "info" },
                    jsxCreateElement("div", { class: "header" },
                        jsxCreateElement("h1", { class: "name", "rv-style": "styles.infoName", "rv-text": "episode.show.title" }),
                        jsxCreateElement("h1", { class: "title", "rv-style": "styles.infoTitle", "rv-text": "episode.title" }),
                        jsxCreateElement("p", { class: "subtitle", "rv-style": "styles.infoSubtitle", "rv-text": "episode.subtitle" }),
                        jsxCreateElement("div", { "rv-if": "error" },
                            jsxCreateElement("pre", null,
                                jsxCreateElement("code", { "rv-text": "error" })))),
                    jsxCreateElement("div", { class: "controls" },
                        jsxCreateElement("button", { class: "play", "rv-on-click": "play", "rv-style": "styles.play", "rv-class-has-label": "playLabel" },
                            jsxCreateElement("span", { "rv-template": "icons.play" }),
                            jsxCreateElement("span", { "rv-text": "playLabel" }))))));
        }
        else {
            return null;
        }
    }
}
export { PodlovePlayButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1wbGF5LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wb2Rsb3ZlLXBsYXktYnV0dG9uL3BvZGxvdmUtcGxheS1idXR0b24uY29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUzVELE1BQU0sU0FBUyxHQUFHLDBXQUEwVyxDQUFDO0FBRTdYLE1BQWEsMEJBQTJCLFNBQVEsU0FBUztJQUNoRCxNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO0lBRXBDLE1BQU0sQ0FBNkI7SUFDdEMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUV0QixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU87WUFDTCxTQUFTO1lBQ1QsUUFBUTtZQUNSLGFBQWE7WUFDYixZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7WUFDWixJQUFJO1NBQ0wsQ0FBQztJQUNKLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxLQUFLLENBQXlCO0lBRTlCLEtBQUssR0FBb0M7UUFDOUMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFT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