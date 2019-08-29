"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const collapse_service_1 = require("../../services/collapse.service");
class NavbarComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.debug = core_1.Debug('component:bs4-navbar');
        this.scope = {
            toggle: this.toggle,
            isCollapsed: true,
        };
        const self = this;
        const $el = core_1.JQuery(this.el);
        const $collapse = $el.find('.navbar-collapse');
        const dispatcher = new core_1.EventDispatcher('main');
        this.collapseService = new collapse_service_1.CollapseService($collapse);
        const onStateChange = () => {
            if (this.collapseService.isCollapsed()) {
                $el
                    .addClass(collapse_service_1.CollapseService.CLASSNAME.COLLAPSED)
                    .attr('aria-expanded', 'false');
            }
            else {
                $el
                    .removeClass(collapse_service_1.CollapseService.CLASSNAME.COLLAPSED)
                    .attr('aria-expanded', 'true');
            }
            this.scope.isCollapsed = this.collapseService.isCollapsed();
        };
        $collapse.on(collapse_service_1.CollapseService.EVENT.SHOWN, onStateChange);
        $collapse.on(collapse_service_1.CollapseService.EVENT.HIDDEN, onStateChange);
        dispatcher.on('newPageReady', () => {
            this.collapseService.hide();
        });
        onStateChange();
        this.init(NavbarComponent.observedAttributes);
    }
    static get observedAttributes() {
        return [];
    }
    toggle(context, event) {
        this.debug('toggle');
        this.collapseService.toggle();
        event.preventDefault();
        event.stopPropagation();
    }
    template() {
        return null;
    }
}
exports.NavbarComponent = NavbarComponent;
NavbarComponent.tagName = 'bs4-navbar';
