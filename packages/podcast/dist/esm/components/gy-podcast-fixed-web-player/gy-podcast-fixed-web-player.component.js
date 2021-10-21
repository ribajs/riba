import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { PodloveService } from "../../services";
import pugTemplate from "./gy-podcast-fixed-web-player.component.pug";
export class GyPodcastFixedWebPlayerComponent extends Component {
    static tagName = "gy-podcast-fixed-web-player";
    _debug = false;
    autobind = true;
    scope = {
        episodeConfigUrl: "",
        configUrl: "",
        activeTab: "none",
    };
    static get observedAttributes() {
        return ["active-tab"];
    }
    async beforeBind() {
        await super.beforeBind();
        this.scope.configUrl = PodloveService.getConfigPath(this.scope.activeTab);
        this.scope.episodeConfigUrl = PodloveService.getLatestEpisodeConfigPath();
    }
    connectedCallback() {
        super.connectedCallback();
        this.init(GyPodcastFixedWebPlayerComponent.observedAttributes);
    }
    template() {
        if (!hasChildNodesTrim(this)) {
            return pugTemplate(this.scope);
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3ktcG9kY2FzdC1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2d5LXBvZGNhc3QtZml4ZWQtd2ViLXBsYXllci9neS1wb2RjYXN0LWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBU3RFLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSxTQUFTO0lBQ3RELE1BQU0sQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7SUFDL0MsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNaLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFMUIsS0FBSyxHQUFVO1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxNQUFNO0tBQ2xCLENBQUM7SUFFRixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsTUFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDNUUsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVTLFFBQVE7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUMifQ==