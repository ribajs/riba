"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const dropdown_service_1 = require("../../services/dropdown.service");
class DropdownComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.debug = core_1.Debug('component:bs4-dropdown');
        this.scope = {
            toggle: this.toggle,
        };
        const self = this;
        const $el = core_1.JQuery(this.el);
        this.dropdownService = new dropdown_service_1.DropdownService($el.find('.dropdown-toggle')[0]);
        this.init(DropdownComponent.observedAttributes);
    }
    static get observedAttributes() {
        return [];
    }
    toggle(context, event) {
        this.debug('toggle');
        event.preventDefault();
        event.stopPropagation();
        return this.dropdownService.toggle();
    }
    template() {
        return null;
    }
}
exports.DropdownComponent = DropdownComponent;
DropdownComponent.tagName = 'bs4-dropdown';
