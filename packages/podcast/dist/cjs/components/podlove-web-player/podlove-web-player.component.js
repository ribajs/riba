"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_js_1 = require("@ribajs/utils/src/dom.js");
const utils_1 = require("@ribajs/utils");
const config_mixins_js_1 = require("../../mixins/config.mixins.js");
const constants_js_1 = require("../../constants.js");
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
            this.classList.add(constants_js_1.LOADING_CLASS);
            this.classList.remove(constants_js_1.READY_CLASS);
        }
        else {
            this.classList.remove(constants_js_1.LOADING_CLASS);
            this.classList.add(constants_js_1.READY_CLASS);
        }
    }
    async maybeLoadPolyfills() {
        const modernBrowser = "fetch" in window && "assign" in Object;
        if (!modernBrowser) {
            await (0, utils_1.loadScript)(constants_js_1.DEFAULT_POLYFILLS_URL, constants_js_1.DEFAULT_POLYFILLS_SCRIPT_ID, true, true);
        }
    }
    setId() {
        if (!this.id) {
            this.id = constants_js_1.DEFAULT_MAIN_PLAYER_ID;
        }
    }
    async loadConfig() {
        if (this.scope.configUrl && !this.scope.config) {
            const response = await (0, config_mixins_js_1.getPlayerConfig)(this.scope.configUrl);
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
        await (0, utils_1.loadScript)(constants_js_1.DEFAULT_WEB_PLAYER_URL, constants_js_1.DEFAULT_WEB_PLAYER_SCRIPT_ID, true, true);
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
        this.classList.add(constants_js_1.HAS_PLAYED_CLASS);
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
        if (!(0, dom_js_1.hasChildNodesTrim)(this)) {
            return this._template;
        }
        else {
            this._template = this.innerHTML;
            return null;
        }
    }
}
exports.PodloveWebPlayerComponent = PodloveWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUMzRCxxREFBNkQ7QUFDN0QseUNBQTJDO0FBQzNDLG9FQUFnRTtBQUNoRSxxREFTNEI7QUFRNUIsTUFBYSx5QkFBMEIsU0FBUSxnQkFBUztJQUMvQyxNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0lBRW5DLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFekIsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxLQUFLLENBQXlCO0lBRTlCLEtBQUssR0FBbUM7UUFDN0MsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7SUFFRjtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hC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