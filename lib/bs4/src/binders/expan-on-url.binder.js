"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const collapse_service_1 = require("../services/collapse.service");
const utils_service_1 = require("../services/utils.service");
/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
exports.expanOnUrlBinder = {
    name: 'bs4-expan-on-url',
    routine(el, url) {
        const $el = core_1.JQuery(el);
        const collapseService = new collapse_service_1.CollapseService($el);
        const dispatcher = new core_1.EventDispatcher('main');
        const checkURL = (urlToCheck) => {
            if (urlToCheck && utils_service_1.Utils.onRoute(urlToCheck)) {
                collapseService.show();
                return true;
            }
            collapseService.hide();
            return false;
        };
        dispatcher.on('newPageReady', () => checkURL(url));
        checkURL(url);
    },
};
