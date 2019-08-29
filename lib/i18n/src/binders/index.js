"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_star_binder_1 = require("./i18n/i18n-star.binder");
exports.default = (localesService) => {
    return {
        ...i18n_star_binder_1.i18nStarBinderWrapper(localesService),
    };
};
