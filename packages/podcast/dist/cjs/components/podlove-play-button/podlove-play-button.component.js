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