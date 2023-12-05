"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodlovePlayButtonComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_js_1 = require("@ribajs/utils/src/dom.js");
const control_js_1 = require("@ribajs/utils/src/control.js");
const actions_mixins_js_1 = require("../../mixins/actions.mixins.js");
const config_mixins_js_1 = require("../../mixins/config.mixins.js");
const constants_js_1 = require("../../constants.js");
const PLAY_ICON = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" background="currentColor" aria-hidden="true"><path d="M6 5.76341C6 5.19411 6.60936 4.83238 7.10914 5.10498L18.5429 11.3416C19.064 11.6258 19.064 12.3742 18.5429 12.6584L7.10914 18.895C6.60936 19.1676 6 18.8059 6 18.2366V5.76341Z" rv-style-fill="styles.play.color"></path></svg>`;
class PodlovePlayButtonComponent extends core_1.Component {
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
        webPlayerId: constants_js_1.DEFAULT_MAIN_PLAYER_ID,
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
            const response = await (0, config_mixins_js_1.getEpisodeConfig)(this.scope.episodeUrl);
            this.scope.episode = response.body;
        }
        if (this.scope.configUrl && !this.scope.config) {
            const response = await (0, config_mixins_js_1.getPlayerConfig)(this.scope.configUrl);
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
        const store = await (0, control_js_1.waitForProp)("store", this.player, 100);
        if (!store) {
            console.error("The web player store is not ready!");
            return;
        }
        if (!this.player.store) {
            console.error("The web player store is not ready!");
            return;
        }
        store.dispatch((0, actions_mixins_js_1.selectEpisode)({ index: index, play: true }));
        return store.dispatch((0, actions_mixins_js_1.requestPlay)());
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
        if (!(0, dom_js_1.hasChildNodesTrim)(this)) {
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
exports.PodlovePlayButtonComponent = PodlovePlayButtonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1wbGF5LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wb2Rsb3ZlLXBsYXktYnV0dG9uL3BvZGxvdmUtcGxheS1idXR0b24uY29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkQ7QUFDM0QscURBQTZEO0FBQzdELDZEQUEyRDtBQUMzRCxzRUFBNEU7QUFDNUUsb0VBR3VDO0FBQ3ZDLHFEQUE0RDtBQVM1RCxNQUFNLFNBQVMsR0FBRywwV0FBMFcsQ0FBQztBQUU3WCxNQUFhLDBCQUEyQixTQUFRLGdCQUFTO0lBQ2hELE1BQU0sQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7SUFFcEMsTUFBTSxDQUE2QjtJQUN0QyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRXRCLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTztZQUNMLFNBQVM7WUFDVCxRQUFRO1lBQ1IsYUFBYTtZQUNiLFlBQVk7WUFDWixlQUFlO1lBQ2YsWUFBWTtZQUNaLElBQUk7U0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBeUI7SUFFOUIsS0FBSyxHQUFvQztRQUM5QyxPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLHFDQUFzQjtRQUNuQyxTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJ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