"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const fetch = async (url, init) => {
    const { default: _fetch } = await Promise.resolve().then(() => require('node-fetch'));
    return _fetch(url, init);
};
exports.fetch = fetch;
exports.default = exports.fetch;
//# sourceMappingURL=fetch.js.map