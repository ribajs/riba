"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const popper_js_1 = __importDefault(require("popper.js")); // /dist/umd/popper
/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/tooltips/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/tooltip.js
 */
const debug_1 = __importDefault(require("debug"));
const core_1 = require("@ribajs/core");
const template = '<div class="tooltip" role="tooltip">' +
    '<div class="arrow"></div>' +
    '<div class="tooltip-inner"></div></div>';
const debug = debug_1.default('binder:rv-bs4-tooltip');
/**
 *
 */
exports.tooltipBinder = {
    name: 'bs4-tooltip',
    block: false,
    bind(el) {
        this.customData.$tip = core_1.JQuery(template);
        this.customData.show = () => {
            const attachment = 'top';
            const offset = 0;
            this.customData.popper = new popper_js_1.default(el, this.customData.$tip[0], {
                placement: attachment,
                modifiers: {
                    offset: {
                        offset,
                    },
                    flip: {
                        behavior: 'flip',
                    },
                    arrow: {
                        element: '.arrow',
                    },
                    preventOverflow: {
                        boundariesElement: 'scrollParent',
                    },
                },
                onCreate: (data) => {
                    debug('onCreate');
                },
                onUpdate: (data) => {
                    debug('onUpdate');
                },
            });
            this.customData.$tip.appendTo(document.body);
            this.customData.$tip.addClass('show');
            this.customData.$tip.addClass('bs-tooltip-' + attachment);
        };
        this.customData.hide = () => {
            this.customData.$tip.removeClass('show');
            if (this.customData.popper) {
                this.customData.popper.destroy();
            }
        };
        el.addEventListener('mouseenter', this.customData.show);
        el.addEventListener('mouseleave', this.customData.hide);
    },
    routine(el, text) {
        debug('TODO routine');
        this.customData.$tip.find('.tooltip-inner').html(text);
    },
    unbind() {
        this.customData.hide();
        this.el.removeEventListener('mouseenter', this.customData.show);
        this.el.removeEventListener('mouseleave', this.customData.hide);
    },
};
