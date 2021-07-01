"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const utils_1 = require("@ribajs/utils");
class PodloveWebPlayerComponent extends core_1.Component {
    static tagName = "podlove-web-player";
    static get observedAttributes() {
        return ["selector", "episode", "config"];
    }
    requiredAttributes() {
        return ["selector", "episode", "config"];
    }
    scope = {
        selector: "#podlove-web-player",
        episode: "",
        config: "",
    };
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.init(PodloveWebPlayerComponent.observedAttributes);
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
        window.podlovePlayer(this.scope.selector, this.scope.episode, this.scope.config);
    }
    async beforeBind() {
        await super.beforeBind();
        await this.maybeLoadPolyfills();
        await this.loadPlayer();
    }
    template() {
        if (!utils_1.hasChildNodesTrim(this)) {
            return '<div id="podlove-web-player"></div>';
        }
        else {
            return null;
        }
    }
}
exports.PodloveWebPlayerComponent = PodloveWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUUzRCx5Q0FBOEQ7QUFFOUQsTUFBYSx5QkFBMEIsU0FBUSxnQkFBUztJQUMvQyxNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0lBRTdDLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sS0FBSyxHQUFtQztRQUM3QyxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDO0lBRUY7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFUyxLQUFLLENBQUMsa0JBQWtCO1FBRWhDLE1BQU0sYUFBYSxHQUFHLE9BQU8sSUFBSSxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztRQUU5RCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sa0JBQVUsQ0FDZCwrQ0FBK0MsRUFDL0Msa0NBQWtDLEVBQ2xDLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxVQUFVO1FBQ3hCLE1BQU0sa0JBQVUsQ0FDZCwyQ0FBMkMsRUFDM0Msd0JBQXdCLEVBQ3hCLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtRQUVELE1BQU0sQ0FBQyxhQUFhLENBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2xCLENBQUM7SUFDSixDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsTUFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNoQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMseUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxxQ0FBcUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7O0FBdkVILDhEQXdFQyJ9