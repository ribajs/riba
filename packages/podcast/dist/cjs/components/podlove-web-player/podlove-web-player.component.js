"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const utils_1 = require("@ribajs/utils");
const events_1 = require("@ribajs/events");
class PodloveWebPlayerComponent extends core_1.Component {
    static tagName = "podlove-web-player";
    static loadingClass = "podlove-web-player-loading";
    static readyClass = "podlove-web-player-ready";
    routerEvents;
    static get observedAttributes() {
        return ["episode", "config"];
    }
    requiredAttributes() {
        return ["episode", "config"];
    }
    scope = {
        selector: "#podlove-web-player",
        id: "podlove-web-player",
        episode: "",
        config: "",
    };
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.setLoadingClass(true);
        this.routerEvents = new events_1.EventDispatcher("main");
        this.routerEvents.on("newPageReady", this.onNewPageReady, this);
        this.init(PodloveWebPlayerComponent.observedAttributes);
    }
    disconnectedCallback() {
        if (this.bound && this.view) {
            this.unbind();
        }
        this.innerHTML = "";
        this.templateLoaded = false;
        super.disconnectedCallback();
    }
    onNewPageReady() {
        console.debug("newPageReady");
    }
    setLoadingClass(loading) {
        if (loading) {
            this.classList.add(PodloveWebPlayerComponent.loadingClass);
            this.classList.remove(PodloveWebPlayerComponent.readyClass);
        }
        else {
            this.classList.remove(PodloveWebPlayerComponent.loadingClass);
            this.classList.add(PodloveWebPlayerComponent.readyClass);
        }
    }
    async maybeLoadPolyfills() {
        const modernBrowser = "fetch" in window && "assign" in Object;
        if (!modernBrowser) {
            await utils_1.loadScript("//cdn.podlove.org/web-player/5.x/polyfills.js", "podlove-web-player-polyfills-5-x", true, true);
        }
    }
    async loadPlayer() {
        await utils_1.loadScript("//cdn.podlove.org/web-player/5.x/embed.js", "podlove-web-player-5-x", true, true);
        if (!window.podlovePlayer) {
            throw new Error("Can't load Podlove Web Player");
        }
        await window.podlovePlayer(this.scope.selector, this.scope.episode, this.scope.config);
        this.setLoadingClass(false);
    }
    async beforeTemplate() {
        this.scope.id = utils_1.getUID(this.scope.id + "-");
        this.scope.selector = "#" + this.scope.id;
    }
    async beforeBind() {
        await super.beforeBind();
        await this.maybeLoadPolyfills();
        await this.loadPlayer();
    }
    template() {
        if (!utils_1.hasChildNodesTrim(this)) {
            return `<div id="${this.scope.id}"></div>`;
        }
        else {
            return null;
        }
    }
}
exports.PodloveWebPlayerComponent = PodloveWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUUzRCx5Q0FBc0U7QUFDdEUsMkNBQWlEO0FBRWpELE1BQWEseUJBQTBCLFNBQVEsZ0JBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUV0QyxNQUFNLENBQUMsWUFBWSxHQUFHLDRCQUE0QixDQUFDO0lBQ25ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQUM7SUFFNUMsWUFBWSxDQUFtQjtJQUV6QyxNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxLQUFLLEdBQW1DO1FBQzdDLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUVGO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHdCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFD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