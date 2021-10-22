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
        const store = await (0, control_1.waitForProp)("store", this.player, 100);
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
        if (!(0, dom_1.hasChildNodesTrim)(this)) {
            return podlove_fixed_web_player_component_template_1.default;
        }
        else {
            return null;
        }
    }
}
exports.PodloveFixedWebPlayerComponent = PodloveFixedWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF5QztBQUN6QywrQ0FBMEQ7QUFDMUQsdURBQXdEO0FBQ3hELGdJQUFxRTtBQUtyRSwrQ0FBeUQ7QUFhekQsTUFBYSw4QkFBK0IsU0FBUSxnQkFBUztJQUNwRCxNQUFNLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0lBQzVDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDWixRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLE1BQU0sQ0FBNkI7SUFDbkMsS0FBSyxDQUF5QjtJQUV4QyxLQUFLLEdBQVU7UUFDYixPQUFPLEVBQUUsU0FBUztRQUNsQixNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLGtDQUFzQjtRQUNoQyxRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDO0lBRUYsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPO1lBQ0wsV0FBVztZQUNYLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztZQUNULFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFUyxLQUFLLENBQUMsYUFBYTtRQUMzQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDZ0IsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsSUFBSSxTQUFTLENBQUM7UUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FDWCx1Q0FBdUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FDL0QsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSxxQkFBVyxFQUM3QixPQUFPLEVBQ1AsSUFBSSxDQUFDLE1BQU0sRUFDWCxHQUFHLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyQyxJQUFJLFVBQVUsRUFBRSxJQUFJLEtBQUsscUJBQXFCLEVBQUU7Z0JBQzlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO29CQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2lCQUM1QztnQkFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtvQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztpQkFDekM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFUyxLQUFLLENBQUMsU0FBUztRQUN2QixNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsSUFBQSx1QkFBaUIsRUFBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLHFEQUFRLENBQUM7U0FDakI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztBQXJGSCx3RUFzRkMifQ==