"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveFixedWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_js_1 = require("@ribajs/utils/src/dom.js");
const control_js_1 = require("@ribajs/utils/src/control.js");
const constants_js_1 = require("../../constants.js");
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
        playerId: constants_js_1.DEFAULT_MAIN_PLAYER_ID,
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
        const store = await (0, control_js_1.waitForProp)("store", this.player, 100);
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
        if (!(0, dom_js_1.hasChildNodesTrim)(this)) {
            const { default: template } = await Promise.resolve().then(() => __importStar(require("./podlove-fixed-web-player.component.template.js")));
            return template;
        }
        else {
            return null;
        }
    }
}
exports.PodloveFixedWebPlayerComponent = PodloveFixedWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW9EO0FBQ3BELHFEQUE2RDtBQUM3RCw2REFBMkQ7QUFNM0QscURBQTREO0FBYzVELE1BQWEsOEJBQStCLFNBQVEsZ0JBQVM7SUFDcEQsTUFBTSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztJQUM1QyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1osUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoQixNQUFNLENBQTZCO0lBQ25DLEtBQUssQ0FBeUI7SUFFeEMsS0FBSyxHQUFVO1FBQ2IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxxQ0FBc0I7UUFDaEMsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ2hCLENBQUM7SUFFRixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU87WUFDTCxXQUFXO1lBQ1gsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTO1lBQ1QsUUFBUTtZQUNSLFVBQVU7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO1FBQzNCLE1BQU0s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