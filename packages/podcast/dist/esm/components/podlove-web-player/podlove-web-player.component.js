import { Component } from "@ribajs/core";
import { loadScript } from "@ribajs/utils";
export class PodloveWebPlayerComponent extends Component {
    static tagName = "podlove-web-player";
    static loadingClass = "podlove-web-player-loading";
    static readyClass = "podlove-web-player-ready";
    static get observedAttributes() {
        return ["episode", "config"];
    }
    requiredAttributes() {
        return ["episode", "config"];
    }
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
        console.debug("connectedCallback");
    }
    disconnectedCallback() {
        if (this.bound && this.view) {
            this.unbind();
        }
        this.innerHTML = "";
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
            await loadScript("//cdn.podlove.org/web-player/5.x/polyfills.js", "podlove-web-player-polyfills-5-x", true, true);
        }
    }
    async loadPlayer() {
        await loadScript("//cdn.podlove.org/web-player/5.x/embed.js", "podlove-web-player-5-x", true, true);
        if (!window.podlovePlayer) {
            throw new Error("Can't load Podlove Web Player");
        }
        await window.podlovePlayer(this, this.scope.episode, this.scope.config);
        this.setLoadingClass(false);
    }
    async beforeBind() {
        console.debug("beforeBind");
        await super.beforeBind();
        await this.maybeLoadPolyfills();
        await this.loadPlayer();
    }
    template() {
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBRTNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFNBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUV0QyxNQUFNLENBQUMsWUFBWSxHQUFHLDRCQUE0QixDQUFDO0lBQ25ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQUM7SUFFdEQsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sS0FBSyxHQUFtQztRQUM3QyxPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUVGO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVTLGVBQWUsQ0FBQyxPQUFnQjtRQUN4QyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFUyxLQUFLLENBQUMsa0JBQWtCO1FBRWhDLE1BQU0sYUFBYSxHQUFHLE9BQU8sSUFBSSxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztRQUU5RCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sVUFBVSxDQUNkLCtDQUErQyxFQUMvQyxrQ0FBa0MsRUFDbEMsSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsTUFBTSxVQUFVLENBQ2QsMkNBQTJDLEVBQzNDLHdCQUF3QixFQUN4QixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDbEQ7UUFFa0IsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUMzQyxJQUFJLEVBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNsQixDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQU05QixDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyJ9