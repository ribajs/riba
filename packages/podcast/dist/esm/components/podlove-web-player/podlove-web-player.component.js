import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { loadScript } from "@ribajs/utils";
const DEFAULT_POLYFILLS_URL = "//cdn.podlove.org/web-player/5.x/polyfills.js";
const DEFAULT_WEB_PLAYER_URL = "//cdn.podlove.org/web-player/5.x/embed.js";
export class PodloveWebPlayerComponent extends Component {
    static tagName = "podlove-web-player";
    static loadingClass = "podlove-web-player-loading";
    static readyClass = "podlove-web-player-ready";
    _template = "";
    static get observedAttributes() {
        return ["episode", "config"];
    }
    requiredAttributes() {
        return ["episode", "config"];
    }
    store;
    scope = {
        episode: "",
        config: "",
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
            await loadScript(DEFAULT_POLYFILLS_URL, "podlove-web-player-polyfills-5-x", true, true);
        }
    }
    async loadPlayer() {
        await loadScript(DEFAULT_WEB_PLAYER_URL, "podlove-web-player-5-x", true, true);
        if (!window.podlovePlayer) {
            throw new Error("Can't load Podlove Web Player");
        }
        this.store = await window.podlovePlayer(this, this.scope.episode, this.scope.config);
        this.setLoadingClass(false);
    }
    async beforeBind() {
        await super.beforeBind();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxxQkFBcUIsR0FBRywrQ0FBK0MsQ0FBQztBQUM5RSxNQUFNLHNCQUFzQixHQUFHLDJDQUEyQyxDQUFDO0FBRTNFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxTQUFTO0lBQy9DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7SUFFdEMsTUFBTSxDQUFDLFlBQVksR0FBRyw0QkFBNEIsQ0FBQztJQUNuRCxNQUFNLENBQUMsVUFBVSxHQUFHLDBCQUEwQixDQUFDO0lBRTVDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFekIsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sS0FBSyxDQUF5QjtJQUU5QixLQUFLLEdBQW1DO1FBQzdDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDO0lBRUY7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRVMsZUFBZSxDQUFDLE9BQWdCO1FBQ3hDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxrQkFBa0I7UUFFaEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxJQUFJLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDO1FBRTlELElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsTUFBTSxVQUFVLENBQ2QscUJBQXFCLEVBQ3JCLGtDQUFrQyxFQUNsQyxJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLFVBQVUsQ0FDZCxzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUNyQyxJQUFJLEVBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNsQixDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQU05QixDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsTUFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNoQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUMifQ==