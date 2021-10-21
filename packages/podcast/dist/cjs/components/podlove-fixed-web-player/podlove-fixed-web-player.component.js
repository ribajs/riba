"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveFixedWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const control_1 = require("@ribajs/utils/src/control");
const podlove_fixed_web_player_component_template_1 = __importDefault(require("./podlove-fixed-web-player.component.template"));
const constants_1 = require("../../constants");
class PodloveFixedWebPlayerComponent extends core_1.Component {
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
        playerId: constants_1.DEFAULT_MAIN_PLAYER_ID,
        position: 'bottom',
    };
    static get observedAttributes() {
        return ["player-id", "episode-url", "config-url", "episode", "config", "position"];
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
        const store = await (0, control_1.waitForProp)('store', this.player, 100);
        if (!store) {
            console.error(`Web player not ready!`);
            return;
        }
        this.store = store;
        store.subscribe(() => {
            const { lastAction } = store.getState();
            this.debug("lastAction", lastAction);
            if (lastAction?.type === 'PLAYER_REQUEST_PLAY') {
                if (this.scope.position === 'bottom') {
                    document.body.style.marginBottom = "139px";
                }
                if (this.scope.position === 'top') {
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
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return podlove_fixed_web_player_component_template_1.default;
        }
        else {
            return null;
        }
    }
}
exports.PodloveFixedWebPlayerComponent = PodloveFixedWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF5QztBQUN6QywrQ0FBMEQ7QUFDMUQsdURBQXdEO0FBQ3hELGdJQUFxRTtBQUtyRSwrQ0FBeUQ7QUFnQnpELE1BQWEsOEJBQStCLFNBQVEsZ0JBQVM7SUFDcEQsTUFBTSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztJQUM1QyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1osUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoQixNQUFNLENBQTZCO0lBQ25DLEtBQUssQ0FBeUI7SUFFeEMsS0FBSyxHQUFVO1FBQ2IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxrQ0FBc0I7UUFDaEMsUUFBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQztJQUVGLE1BQU0sS0FBSyxrQkFBa0I7UUFDM0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO1FBQzNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQXFDLENBQUM7UUFDckcsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDO1FBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUM5RSxPQUFPO1NBQ1I7UUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEscUJBQVcsRUFBd0IsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN2QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxFQUFFLElBQUksS0FBSyxxQkFBcUIsRUFBRTtnQkFDOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7aUJBQzVDO2dCQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO29CQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2lCQUN6QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVTLEtBQUssQ0FBQyxTQUFTO1FBQ3ZCLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFBLHVCQUFpQixFQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8scURBQVEsQ0FBQztTQUNqQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7O0FBdEVILHdFQXVFQyJ9