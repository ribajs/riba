"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyPodcastFixedWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const services_1 = require("../../services");
const gy_podcast_fixed_web_player_component_pug_1 = __importDefault(require("./gy-podcast-fixed-web-player.component.pug"));
class GyPodcastFixedWebPlayerComponent extends core_1.Component {
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
        this.scope.configUrl = services_1.PodloveService.getConfigPath(this.scope.activeTab);
        this.scope.episodeConfigUrl = services_1.PodloveService.getLatestEpisodeConfigPath();
    }
    connectedCallback() {
        super.connectedCallback();
        this.init(GyPodcastFixedWebPlayerComponent.observedAttributes);
    }
    template() {
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return (0, gy_podcast_fixed_web_player_component_pug_1.default)(this.scope);
        }
        else {
            return null;
        }
    }
}
exports.GyPodcastFixedWebPlayerComponent = GyPodcastFixedWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3ktcG9kY2FzdC1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9neS1wb2RjYXN0LWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF5QztBQUN6QywrQ0FBMEQ7QUFDMUQsNkNBQWdEO0FBQ2hELDRIQUFzRTtBQVN0RSxNQUFhLGdDQUFpQyxTQUFRLGdCQUFTO0lBQ3RELE1BQU0sQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7SUFDL0MsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNaLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFMUIsS0FBSyxHQUFVO1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxNQUFNO0tBQ2xCLENBQUM7SUFFRixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRVMsS0FBSyxDQUFDLFVBQVU7UUFDeEIsTUFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcseUJBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLHlCQUFjLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUM1RSxDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsSUFBQSx1QkFBaUIsRUFBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUEsbURBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztBQWhDSCw0RUFpQ0MifQ==