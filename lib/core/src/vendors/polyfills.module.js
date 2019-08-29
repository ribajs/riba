"use strict";
// import '@babel/runtime-corejs2/regenerator/index'
// import '@babel/runtime-corejs2/core-js/promise.js';
Object.defineProperty(exports, "__esModule", { value: true });
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill#Polyfill
(() => {
    if (typeof window.CustomEvent === 'function') {
        return false;
    }
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
require("core-js/fn/string/starts-with.js");
require("@babel/runtime-corejs2/core-js/promise.js");
