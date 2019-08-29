"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const dropdown_service_1 = require("../services/dropdown.service");
/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/dropdown/
 */
exports.dropdownBinder = {
    name: 'bs4-dropdown',
    routine(el, option) {
        const $el = core_1.JQuery(el);
        let $toggler;
        if ($el.hasClass('dropdown-toggle')) {
            $toggler = $el;
        }
        else {
            $toggler = $el.find('.dropdown-toggle');
        }
        if (!$toggler) {
            $toggler = $el;
        }
        const dropdownService = new dropdown_service_1.DropdownService($toggler[0]);
        $toggler.on('click', (event) => {
            dropdownService.toggle();
        });
    },
};
