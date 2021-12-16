"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateFileService = void 0;
const path_1 = require("path");
const consolidate = __importStar(require("consolidate"));
const constants_1 = require("./constants");
class TemplateFileService {
    constructor(dir, defaultEngine) {
        this.dir = dir;
        this.defaultEngine = defaultEngine;
        this.log = console;
    }
    getEngine(templatePath) {
        const ext = (0, path_1.extname)(templatePath);
        const detected = ext?.substring(1) || this.defaultEngine;
        if (detected !== this.defaultEngine) {
            this.log.warn(`Detected template engine is not the default: "${detected}" (Default: "${this.defaultEngine}")'`);
        }
        try {
            require.resolve(detected);
        }
        catch (error) {
            this.log.error(`Template engine not installed, try to run "yarn add ${detected}"`);
        }
        if (!constants_1.SUPPORTED_TEMPLATE_ENGINES.includes(detected)) {
            throw new Error(`The theme config must contain a "viewEngine" property of a supported template engine string but is "${detected}"!`);
        }
        return detected;
    }
    normalizePath(path) {
        if (!(0, path_1.extname)(path)) {
            path = path + "." + this.defaultEngine;
        }
        if (!path.startsWith(this.dir)) {
            path = (0, path_1.resolve)(this.dir, path);
        }
        return path;
    }
    transform(layout, rootTag, componentTagName) {
        layout = layout.replace(new RegExp(rootTag, "gi"), componentTagName);
        return layout;
    }
    async load(path, rootTag, componentTagName, variables = {}) {
        path = this.normalizePath(path);
        const engine = this.getEngine(path);
        try {
            let layout = await consolidate[engine](path, variables);
            layout = this.transform(layout, rootTag, componentTagName);
            return {
                engine,
                layout,
                path,
            };
        }
        catch (error) {
            this.log.error(error);
            throw error;
        }
    }
}
exports.TemplateFileService = TemplateFileService;
//# sourceMappingURL=template-file.service.js.map