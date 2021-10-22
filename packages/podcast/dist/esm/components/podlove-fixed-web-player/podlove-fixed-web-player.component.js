import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { waitForProp } from "@ribajs/utils/src/control";
import template from "./podlove-fixed-web-player.component.template";
import { DEFAULT_MAIN_PLAYER_ID } from "../../constants";
export class PodloveFixedWebPlayerComponent extends Component {
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
                if (this.scope.position === "bottom") {
                    document.body.style.marginBottom = "139px";
                }
                if (this.scope.position === "top") {
                    document.body.style.marginTop = "139px";
                }
            }
        });
        return this.player;
    }
    async afterBind() {
        await super.afterBind();
        await this.initWebPlayer();
    }
    template() {
        if (!hasChildNodesTrim(this)) {
            return template;
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sUUFBUSxNQUFNLCtDQUErQyxDQUFDO0FBS3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYXpELE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxTQUFTO0lBQ3BELE1BQU0sQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7SUFDNUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNaLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsTUFBTSxDQUE2QjtJQUNuQyxLQUFLLENBQXlCO0lBRXhDLEtBQUssR0FBVTtRQUNiLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUM7SUFFRixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU87WUFDTCxXQUFXO1lBQ1gsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTO1lBQ1QsUUFBUTtZQUNSLFVBQVU7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO1FBQzNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNnQixDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxJQUFJLFNBQVMsQ0FBQztRQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUNYLHVDQUF1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUMvRCxDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxXQUFXLENBQzdCLE9BQU8sRUFDUCxJQUFJLENBQUMsTUFBTSxFQUNYLEdBQUcsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN2QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxFQUFFLElBQUksS0FBSyxxQkFBcUIsRUFBRTtnQkFDOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7aUJBQzVDO2dCQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO29CQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2lCQUN6QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVTLEtBQUssQ0FBQyxTQUFTO1FBQ3ZCLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUMifQ==