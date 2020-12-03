"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Octokit = void 0;
// https://github.com/octokit/rest.js/blob/master/src/index.ts
const core_1 = require("@octokit/core");
const plugin_rest_endpoint_methods_1 = require("@octokit/plugin-rest-endpoint-methods");
exports.Octokit = core_1.Octokit.plugin(
// requestLog,
plugin_rest_endpoint_methods_1.restEndpointMethods
// paginateRest
).defaults({
// userAgent: `octokit-rest.js/${VERSION}`,
});
//# sourceMappingURL=octokit.js.map