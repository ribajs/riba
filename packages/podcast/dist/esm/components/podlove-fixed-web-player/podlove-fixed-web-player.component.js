import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { waitForProp } from "@ribajs/utils/src/control.js";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants.js";
class PodloveFixedWebPlayerComponent extends Component {
    static tagName = "podlove-fixed-web-player";
    _debug = false;
    autobind = true;
    player;
    store;
    scope = {
        episode: undefined,
        config: undefined,
        episodeUrl: "",
        configUrl: "",
        playerId: DEFAULT_MAIN_PLAYER_ID,
        position: "bottom",
        show: this.show,
        hide: this.hide,
    };
    static get observedAttributes() {
        return [
            "player-id",
            "episode-url",
            "config-url",
            "episode",
            "config",
            "position",
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.init(PodloveFixedWebPlayerComponent.observedAttributes);
    }
    async initWebPlayer() {
        const webPlayerEl = document.getElementById(this.scope.playerId);
        this.player = webPlayerEl || undefined;
        if (!this.player) {
            console.error(`Web player element not found by id "${this.scope.playerId}"!`);
            return;
        }
        const store = await waitForProp("store", this.player, 100);
        if (!store) {
            console.error(`Web player not ready!`);
            return;
        }
        this.store = store;
        store.subscribe(() => {
            const { lastAction } = store.getState();
            this.debug("lastAction", lastAction);
            if (lastAction?.type === "PLAYER_REQUEST_PLAY") {
                this.show();
            }
        });
        return this.player;
    }
    show() {
        if (this.player) {
            this.style.height = this.player.clientHeight + "px";
        }
        if (this.scope.position === "bottom") {
            document.body.style.marginBottom = "140px";
            this.style.bottom = "-15px";
        }
        if (this.scope.position === "top") {
            document.body.style.marginTop = "140px";
            this.style.top = "-15px";
        }
    }
    hide() {
        if (this.scope.position === "bottom") {
            document.body.style.marginBottom = "";
            this.style.bottom = "-200px";
        }
        if (this.scope.position === "top") {
            document.body.style.marginTop = "";
            this.style.top = "-200px";
        }
    }
    async afterBind() {
        await super.afterBind();
        await this.initWebPlayer();
    }
    async template() {
        if (!hasChildNodesTrim(this)) {
            const { default: template } = await import("./podlove-fixed-web-player.component.template.js");
            return template;
        }
        else {
            return null;
        }
    }
}
export { PodloveFixedWebPlayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBTTNELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBYzVELE1BQWEsOEJBQStCLFNBQVEsU0FBUztJQUNwRCxNQUFNLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0lBQzVDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDWixRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLE1BQU0sQ0FBNkI7SUFDbkMsS0FBSyxDQUF5QjtJQUV4QyxLQUFLLEdBQVU7UUFDYixPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDaEIsQ0FBQztJQUVGLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTztZQUNMLFdBQVc7WUFDWCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVM7WUFDVCxRQUFRO1lBQ1IsVUFBVTtTQUNYLENBQUM7SUFDSixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRVMsS0FBSyxDQUFDLGFBQWE7UUFDM0IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2dCLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDO1FBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQ1gsdUNBQXVDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLFdBQVcsQ0FDN0IsT0FBTyxFQUNQLElBQUksQ0FBQyxNQUFNLEVBQ1gsR0FBRyxDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ25CLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDckMsSUFBSSxVQUFVLEVBQUUsSUFBSSxLQUFLLHFCQUFxQixFQUFFO2dCQUM5QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDOUI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFUyxLQUFLLENBQUMsU0FBUztRQUN2QixNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRVMsS0FBSyxDQUFDLFFBQVE7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQ3hDLGtEQUFrRCxDQUNuRCxDQUFDO1lBQ0YsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztTQTlHVSw4QkFBOEIifQ==