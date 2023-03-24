import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { loadScript } from "@ribajs/utils/src/index.js";
import { getPlayerConfig } from "../../mixins/config.mixins.js";
import { DEFAULT_MAIN_PLAYER_ID, DEFAULT_POLYFILLS_URL, DEFAULT_WEB_PLAYER_URL, DEFAULT_POLYFILLS_SCRIPT_ID, DEFAULT_WEB_PLAYER_SCRIPT_ID, LOADING_CLASS, READY_CLASS, HAS_PLAYED_CLASS, } from "../../constants.js";
class PodloveWebPlayerComponent extends Component {
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
            this.classList.add(LOADING_CLASS);
            this.classList.remove(READY_CLASS);
        }
        else {
            this.classList.remove(LOADING_CLASS);
            this.classList.add(READY_CLASS);
        }
    }
    async maybeLoadPolyfills() {
        const modernBrowser = "fetch" in window && "assign" in Object;
        if (!modernBrowser) {
            await loadScript(DEFAULT_POLYFILLS_URL, DEFAULT_POLYFILLS_SCRIPT_ID, true, true);
        }
    }
    setId() {
        if (!this.id) {
            this.id = DEFAULT_MAIN_PLAYER_ID;
        }
    }
    async loadConfig() {
        if (this.scope.configUrl && !this.scope.config) {
            const response = await getPlayerConfig(this.scope.configUrl);
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
        await loadScript(DEFAULT_WEB_PLAYER_URL, DEFAULT_WEB_PLAYER_SCRIPT_ID, true, true);
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
        this.classList.add(HAS_PLAYED_CLASS);
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
        if (!hasChildNodesTrim(this)) {
            return this._template;
        }
        else {
            this._template = this.innerHTML;
            return null;
        }
    }
}
export { PodloveWebPlayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQiw0QkFBNEIsRUFDNUIsYUFBYSxFQUNiLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxvQkFBb0IsQ0FBQztBQVE1QixNQUFhLHlCQUEwQixTQUFRLFNBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUVuQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXpCLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU0sS0FBSyxDQUF5QjtJQUU5QixLQUFLLEdBQW1DO1FBQzdDLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDO0lBRUY7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FB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