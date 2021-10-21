"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyPodcastFixedWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const gy_podcast_fixed_web_player_component_pug_1 = __importDefault(require("./gy-podcast-fixed-web-player.component.pug"));
class GyPodcastFixedWebPlayerComponent extends core_1.Component {
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
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return (0, gy_podcast_fixed_web_player_component_pug_1.default)(this.scope);
        }
        else {
            return null;
        }
    }
}
exports.GyPodcastFixedWebPlayerComponent = GyPodcastFixedWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kY2FzdC1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2RjYXN0LWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF5QztBQUN6QywrQ0FBMEQ7QUFFMUQsNEhBQXNFO0FBYXRFLE1BQWEsZ0NBQWlDLFNBQVEsZ0JBQVM7SUFDdEQsTUFBTSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztJQUMvQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1osUUFBUSxHQUFHLElBQUksQ0FBQztJQUUxQixLQUFLLEdBQVU7UUFDYixPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztJQUVGLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsSUFBQSx1QkFBaUIsRUFBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUEsbURBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztBQS9CSCw0RUFnQ0MifQ==