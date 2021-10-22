"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodlovePlayButtonComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const control_1 = require("@ribajs/utils/src/control");
const actions_mixins_1 = require("../../mixins/actions.mixins");
const config_mixins_1 = require("../../mixins/config.mixins");
const constants_1 = require("../../constants");
const podlove_play_button_component_template_1 = __importDefault(require("./podlove-play-button.component.template"));
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
        webPlayerId: constants_1.DEFAULT_MAIN_PLAYER_ID,
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
            const response = await (0, config_mixins_1.getEpisodeConfig)(this.scope.episodeUrl);
            this.scope.episode = response.body;
        }
        if (this.scope.configUrl && !this.scope.config) {
            const response = await (0, config_mixins_1.getPlayerConfig)(this.scope.configUrl);
            this.scope.config = response.body;
        }
    }
    async initConfigs() {
        await this.loadConfigs();
        if (typeof this.scope.config !== "object") {
            throw new Error(`The podlove config object must be of type "object"!\n${JSON.stringify(this.scope.config)}`);
        }
        if (typeof this.scope.episode !== "object") {
            throw new Error(`The episode object must be of type "object"!\n${JSON.stringify(this.scope.episode)}`);
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
        const store = await (0, control_1.waitForProp)("store", this.player, 100);
        if (!store) {
            console.error("The web player store is not ready!");
            return;
        }
        if (!this.player.store) {
            console.error("The web player store is not ready!");
            return;
        }
        store.dispatch((0, actions_mixins_1.selectEpisode)({ index: index, play: true }));
        return store.dispatch((0, actions_mixins_1.requestPlay)());
    }
    async afterBind() {
        await super.afterBind();
        await this.initConfigs();
        await this.initWebPlayer();
    }
    template() {
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return podlove_play_button_component_template_1.default;
        }
        else {
            return null;
        }
    }
}
exports.PodlovePlayButtonComponent = PodlovePlayButtonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1wbGF5LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wb2Rsb3ZlLXBsYXktYnV0dG9uL3BvZGxvdmUtcGxheS1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUEyRDtBQUMzRCwrQ0FBMEQ7QUFDMUQsdURBQXdEO0FBQ3hELGdFQUF5RTtBQUN6RSw4REFBK0U7QUFDL0UsK0NBQXlEO0FBT3pELHNIQUFnRTtBQUVoRSxNQUFNLFNBQVMsR0FBRywwV0FBMFcsQ0FBQztBQUU3WCxNQUFhLDBCQUEyQixTQUFRLGdCQUFTO0lBQ2hELE1BQU0sQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7SUFFcEMsTUFBTSxDQUE2QjtJQUN0QyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRXRCLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTztZQUNMLFNBQVM7WUFDVCxRQUFRO1lBQ1IsYUFBYTtZQUNiLFlBQVk7WUFDWixlQUFlO1lBQ2YsWUFBWTtZQUNaLElBQUk7U0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBeUI7SUFFOUIsS0FBSyxHQUFvQztRQUM5QyxPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLGtDQUFzQjtRQUNuQyxTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsSUFBSSxFQUFF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