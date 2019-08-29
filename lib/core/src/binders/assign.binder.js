"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../services/utils");
/**
 * Assign a value in your model, value must be a object
 * experimental, please TESTME
 */
exports.assignBinder = {
    name: 'assign',
    routine(el, obj) {
        utils_1.Utils.extend(false, this.view.models, obj);
    },
};
