"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveWebPlayerComponent = void 0;
const core_1 = require("@ribajs/core");
const dom_1 = require("@ribajs/utils/src/dom");
const utils_1 = require("@ribajs/utils");
class PodloveWebPlayerComponent extends core_1.Component {
    static tagName = "podlove-web-player";
    static loadingClass = "podlove-web-player-loading";
    static readyClass = "podlove-web-player-ready";
    _template = "";
    static get observedAttributes() {
        return ["episode", "config"];
    }
    requiredAttributes() {
        return ["episode", "config"];
    }
    store;
    scope = {
        episode: "",
        config: "",
    };
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.setLoadingClass(true);
        this.init(PodloveWebPlayerComponent.observedAttributes);
    }
    disconnectedCallback() {
        if (this.bound && this.view) {
            this.unbind();
        }
        this.innerHTML = this._template;
        this.templateLoaded = false;
        super.disconnectedCallback();
    }
    setLoadingClass(loading) {
        if (loading) {
            this.classList.add(PodloveWebPlayerComponent.loadingClass);
            this.classList.remove(PodloveWebPlayerComponent.readyClass);
        }
        else {
            this.classList.remove(PodloveWebPlayerComponent.loadingClass);
            this.classList.add(PodloveWebPlayerComponent.readyClass);
        }
    }
    async maybeLoadPolyfills() {
        const modernBrowser = "fetch" in window && "assign" in Object;
        if (!modernBrowser) {
            await utils_1.loadScript("//cdn.podlove.org/web-player/5.x/polyfills.js", "podlove-web-player-polyfills-5-x", true, true);
        }
    }
    async loadPlayer() {
        await utils_1.loadScript("//cdn.podlove.org/web-player/5.x/embed.js", "podlove-web-player-5-x", true, true);
        if (!window.podlovePlayer) {
            throw new Error("Can't load Podlove Web Player");
        }
        this.store = await window.podlovePlayer(this, this.scope.episode, this.scope.config);
        this.setLoadingClass(false);
    }
    async beforeBind() {
        await super.beforeBind();
        await this.maybeLoadPolyfills();
        await this.loadPlayer();
    }
    template() {
        if (!dom_1.hasChildNodesTrim(this)) {
            return this._template;
        }
        else {
            this._template = this.innerHTML;
            return null;
        }
    }
}
exports.PodloveWebPlayerComponent = PodloveWebPlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS13ZWItcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtd2ViLXBsYXllci9wb2Rsb3ZlLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEyRDtBQUMzRCwrQ0FBMEQ7QUFLMUQseUNBQTJDO0FBRTNDLE1BQWEseUJBQTBCLFNBQVEsZ0JBQVM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztJQUV0QyxNQUFNLENBQUMsWUFBWSxHQUFHLDRCQUE0QixDQUFDO0lBQ25ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQUM7SUFFNUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUV6QixNQUFNLEtBQUssa0JBQWtCO1FBQzNCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxLQUFLLENBQXlCO0lBRTlCLEtBQUssR0FBbUM7UUFDN0MsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUM7SUFFRjtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFUyxlQUFlLENBQUMsT0FBZ0I7UUFDeEMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRVMsS0FBSyxDQUFDLGtCQUFrQjtRQUVoQyxNQUFNLGFBQWEsR0FBRyxPQUFPLElBQUksTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7UUFFOUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQixNQUFNLGtCQUFVLENBQ2QsK0NBQStDLEVBQy9DLGtDQUFrQyxFQUNsQyxJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLGtCQUFVLENBQ2QsMkNBQTJDLEVBQzNDLHdCQUF3QixFQUN4QixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FDckMsSUFBSSxFQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbEIsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFNOUIsQ0FBQztJQUVTLEtBQUssQ0FBQyxVQUFVO1FBQ3hCLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLFFBQVE7UUFDaEIsSUFBSSxDQUFDLHVCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztBQXpHSCw4REEwR0MifQ==