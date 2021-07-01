import { Component } from "@ribajs/core";
import { hasChildNodesTrim, loadScript } from "@ribajs/utils";
export class PodloveWebPlayerComponent extends Component {
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
            await loadScript("//cdn.podlove.org/web-player/5.x/polyfills.js", "podlove-web-player-polyfills-5-x", true, true);
        }
    }
    async loadPlayer() {
        await loadScript("//cdn.podlove.org/web-player/5.x/embed.js", "podlove-web-player-5-x", true, true);
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
        if (!hasChildNodesTrim(this)) {
            return '<div id="podlove-web-player"></div>';
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBRTNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFNBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUU3QyxNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLEtBQUssR0FBbUM7UUFDN0MsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUVGO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsS0FBSyxDQUFDLGtCQUFrQjtRQUVoQyxNQUFNLGFBQWEsR0FBRyxPQUFPLElBQUksTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7UUFFOUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQixNQUFNLFVBQVUsQ0FDZCwrQ0FBK0MsRUFDL0Msa0NBQWtDLEVBQ2xDLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxVQUFVO1FBQ3hCLE1BQU0sVUFBVSxDQUNkLDJDQUEyQyxFQUMzQyx3QkFBd0IsRUFDeEIsSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFUyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLHFDQUFxQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQyJ9