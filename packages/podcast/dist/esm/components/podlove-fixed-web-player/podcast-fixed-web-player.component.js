import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.ts";
import pugTemplate from "./gy-podcast-fixed-web-player.component.pug";
export class GyPodcastFixedWebPlayerComponent extends Component {
    static tagName = "gy-podcast-fixed-web-player";
    _debug = false;
    autobind = true;
    scope = {
        episode: undefined,
        config: undefined,
        episodeUrl: "",
        configUrl: "",
    };
    static get observedAttributes() {
        return ["episode-url", "config-url", "episode", "config"];
    }
    async beforeBind() {
        await super.beforeBind();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kY2FzdC1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2RjYXN0LWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFhdEUsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLFNBQVM7SUFDdEQsTUFBTSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztJQUMvQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1osUUFBUSxHQUFHLElBQUksQ0FBQztJQUUxQixLQUFLLEdBQVU7UUFDYixPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztJQUVGLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQyJ9