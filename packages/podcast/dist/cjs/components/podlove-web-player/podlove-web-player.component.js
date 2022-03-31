"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_js_1 = require("@ribajs/utils/src/dom.js");
const index_js_1 = require("@ribajs/utils/src/index.js");
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
            await (0, index_js_1.loadScript)(constants_js_1.DEFAULT_POLYFILLS_URL, constants_js_1.DEFAULT_POLYFILLS_SCRIPT_ID, true, true);
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
        await (0, index_js_1.loadScript)(constants_js_1.DEFAULT_WEB_PLAYER_URL, constants_js_1.DEFAULT_WEB_PLAYER_SCRIPT_ID, true, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUMzRCxxREFBNkQ7QUFDN0QseURBQXdEO0FBQ3hELG9FQUFnRTtBQUNoRSxxREFTNEI7QUFRNUIsTUFBYSx5QkFBMEIsU0FBUSxnQkFBUztJQUMvQyxNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0lBRW5DLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFekIsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxLQUFLLENBQXlCO0lBRTlCLEtBQUssR0FBbUM7UUFDN0MsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7SUFFRjtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBQ0Qs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