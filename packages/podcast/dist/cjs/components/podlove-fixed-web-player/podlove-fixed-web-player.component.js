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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFvRDtBQUNwRCxxREFBNkQ7QUFDN0QsNkRBQTJEO0FBTTNELHFEQUE0RDtBQWM1RCxNQUFhLDhCQUErQixTQUFRLGdCQUFTO0lBQ3BELE1BQU0sQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7SUFDNUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNaLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsTUFBTSxDQUE2QjtJQUNuQyxLQUFLLENBQXlCO0lBRXhDLEtBQUssR0FBVTtRQUNiLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUscUNBQXNCO1FBQ2hDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtLQUNoQixDQUFDO0lBRUYsTUFBTSxLQUFLLGtCQUFrQjtRQUMzQixPQUFPO1lBQ0wsV0FBVztZQUNYLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztZQUNULFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFUyxLQUFLLENBQUMsYUFBYTtR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