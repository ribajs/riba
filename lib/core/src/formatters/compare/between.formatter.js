"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * a >= b && a <= c
 */
exports.between = {
    name: 'between',
    read(num, ...nums) {
        return num >= nums[0] && num <= nums[1];
    },
};
