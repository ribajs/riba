"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.updateOrCreate = exports.list = void 0;
const shopify_admin_api_1 = require("shopify-admin-api");
const gulp_util_1 = __importDefault(require("gulp-util"));
const list = (themeConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptTags = new shopify_admin_api_1.ScriptTags(themeConfig.store, themeConfig.password);
    const scriptTagList = yield scriptTags.list();
    return scriptTagList;
});
exports.list = list;
const updateOrCreate = (themeConfig, scriptTagsConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptTags = new shopify_admin_api_1.ScriptTags(themeConfig.store, themeConfig.password);
    const scriptTagList = yield scriptTags.list();
    let existingScriptTag = null;
    for (const scriptTag of scriptTagList) {
        if (scriptTag.src === scriptTagsConfig.src) {
            existingScriptTag = scriptTag;
        }
    }
    // update
    if (existingScriptTag) {
        return {
            action: "updated",
            scriptTag: yield scriptTags.update(existingScriptTag.id, scriptTagsConfig),
        };
    }
    // create
    return {
        action: "created",
        scriptTag: yield scriptTags.create(scriptTagsConfig),
    };
});
exports.updateOrCreate = updateOrCreate;
const deleteAll = (themeConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptTags = new shopify_admin_api_1.ScriptTags(themeConfig.store, themeConfig.password);
    const scriptTagList = yield scriptTags.list();
    const results = [];
    for (const scriptTag of scriptTagList) {
        gulp_util_1.default.log(`Delete script tag: `, scriptTag);
        results.push(yield scriptTags.delete(scriptTag.id));
    }
    return results;
});
exports.deleteAll = deleteAll;
//# sourceMappingURL=script-tags.js.map