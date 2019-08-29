"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("../view");
/**
 * if
 * Inserts and binds the element and it's child nodes into the DOM when true.
 */
exports.ifBinder = {
    name: 'if',
    block: true,
    priority: 4000,
    bind(el) {
        this.customData = {};
        if (!this.marker) {
            this.marker = document.createComment(' riba: ' + this.type + ' ' + this.keypath + ' ');
            this.customData.attached = false;
            if (!el.parentNode) {
                // console.warn('Element has no parent node');
            }
            else {
                el.parentNode.insertBefore(this.marker, el);
                el.parentNode.removeChild(el);
            }
        }
        else if (this.customData.bound === false && this.customData.nested) {
            this.customData.nested.bind();
        }
        this.customData.bound = true;
    },
    unbind() {
        if (this.customData.nested) {
            this.customData.nested.unbind();
            this.customData.bound = false;
        }
    },
    routine(el, value) {
        value = !!value;
        if (value !== this.customData.attached) {
            if (value) {
                if (!this.customData.nested) {
                    this.customData.nested = new view_1.View(el, this.view.models, this.view.options);
                    this.customData.nested.bind();
                }
                if (!this.marker || !this.marker.parentNode) {
                    // console.warn('Marker has no parent node');
                }
                else {
                    this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
                }
                this.customData.attached = true;
            }
            else {
                if (!el.parentNode) {
                    // console.warn('Element has no parent node');
                }
                else {
                    el.parentNode.removeChild(el);
                }
                this.customData.attached = false;
            }
        }
    },
    update(models) {
        if (this.customData.nested) {
            this.customData.nested.update(models);
        }
    },
};
