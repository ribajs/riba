"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const utils_1 = require("@ribajs/utils");
const config_mixins_1 = require("../../mixins/config.mixins");
const constants_1 = require("../../constants");
require("@podlove/types/embed");
class PodloveWebPlayerComponent extends core_1.Component {
    static tagName = "podlove-web-player";
    _template = "";
    static get observedAttributes() {
        return ["episode-url", "config-url", "episode", "config"];
    }
    requiredAttributes() {
        return [];
    }
    store;
    scope = {
        episode: undefined,
        config: undefined,
        episodeUrl: "",
        configUrl: "",
    };
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.setLoadingClass(true);
        this.init(PodloveWebPlayerComponent.observedAttributes);
    }
    disconnectedCallback() {
        if (this.bound && this.view) {
            this.unbind();
        }
        this.innerHTML = this._template;
        this.templateLoaded = false;
        super.disconnectedCallback();
    }
    setLoadingClass(loading) {
        if (loading) {
            this.classList.add(constants_1.LOADING_CLASS);
            this.classList.remove(constants_1.READY_CLASS);
        }
        else {
            this.classList.remove(constants_1.LOADING_CLASS);
            this.classList.add(constants_1.READY_CLASS);
        }
    }
    async maybeLoadPolyfills() {
        const modernBrowser = "fetch" in window && "assign" in Object;
        if (!modernBrowser) {
            await (0, utils_1.loadScript)(constants_1.DEFAULT_POLYFILLS_URL, constants_1.DEFAULT_POLYFILLS_SCRIPT_ID, true, true);
        }
    }
    setId() {
        if (!this.id) {
            this.id = constants_1.DEFAULT_MAIN_PLAYER_ID;
        }
    }
    async loadConfig() {
        if (this.scope.configUrl && !this.scope.config) {
            const response = await (0, config_mixins_1.getPlayerConfig)(this.scope.configUrl);
            this.scope.config = response.body;
        }
    }
    async initConfig() {
        await this.loadConfig();
        if (typeof this.scope.config !== "object") {
            throw new Error(`The podlove config object must be of type "object"!\n${JSON.stringify(this.scope.config)}`);
        }
        this.style.backgroundColor = this.scope.config.theme.tokens.brandLightest;
    }
    async loadPlayer() {
        await (0, utils_1.loadScript)(constants_1.DEFAULT_WEB_PLAYER_URL, constants_1.DEFAULT_WEB_PLAYER_SCRIPT_ID, true, true);
        if (!window.podlovePlayer) {
            throw new Error("Can't load Podlove Web Player");
        }
        const store = await window.podlovePlayer(this, this.scope.episode || this.scope.episodeUrl, this.scope.config || this.scope.configUrl);
        this.store = store;
        this.setLoadingClass(false);
        this.store.subscribe(() => {
            const { lastAction } = store.getState();
            if (lastAction?.type === "PLAYER_REQUEST_PLAY") {
                this.onPlay(lastAction);
            }
        });
    }
    onPlay(action) {
        this.debug("onPlay", action);
        this.classList.add(constants_1.HAS_PLAYED_CLASS);
    }
    async beforeBind() {
        await super.beforeBind();
        await this.initConfig();
    }
    async afterBind() {
        await super.afterBind();
        this.setId();
        await this.maybeLoadPolyfills();
        await this.loadPlayer();
    }
    template() {
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return this._template;
        }
        else {
            this._template = this.innerHTML;
            return null;
        }
    }
}
exports.PodloveWebPlayerComponent = PodloveWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUMzRCwrQ0FBMEQ7QUFDMUQseUNBQTJDO0FBQzNDLDhEQUE2RDtBQUM3RCwrQ0FTeUI7QUFFekIsZ0NBQThCO0FBUzlCLE1BQWEseUJBQTBCLFNBQVEsZ0JBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUVuQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXpCLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU0sS0FBSyxDQUF5QjtJQUU5QixLQUFLLEdBQW1DO1FBQzdDLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDO0lBRUY7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENB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