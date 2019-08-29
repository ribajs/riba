"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = {
    name: 'match',
    read(a, regexp, flags) {
        return a.match(new RegExp(regexp, flags));
    },
};
