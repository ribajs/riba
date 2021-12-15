"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.validateFullThemeConfig = exports.validateNestThemeConfig = exports.validateThemeConfig = void 0;
const vm_1 = require("vm");
const YAML = require("yaml");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const node_ssr_1 = require("@ribajs/node-ssr");
const validateThemeConfig = (themeConfig) => {
    if (typeof themeConfig.name !== 'string') {
        throw new Error('The theme config must contain a "name" property of type string!');
    }
    if (typeof themeConfig.assetsDir !== 'string') {
        throw new Error('The theme config must contain a "assetsDir" property of type string!');
    }
    if (typeof themeConfig.viewsDir !== 'string') {
        throw new Error('The theme config must contain a "viewsDir" property of type string!');
    }
    if (!node_ssr_1.SUPPORTED_TEMPLATE_ENGINES.includes(themeConfig.viewEngine)) {
        throw new Error('The theme config must contain a "viewEngine" property of a supported template engine string!');
    }
    if (themeConfig.routes) {
        if (!Array.isArray(themeConfig.routes)) {
            throw new Error('Theme config: "routes" property must be an array!');
        }
    }
};
exports.validateThemeConfig = validateThemeConfig;
const validateNestThemeConfig = (nestThemeConfig) => {
    if (typeof nestThemeConfig.themeDir !== 'string') {
        throw new Error('The nest theme config must contain a "themeDir" property of type string!\nThis property is used to find the the current active theme.');
    }
    if (typeof nestThemeConfig.active !== 'string') {
        throw new Error('The nest theme config must contain a "active" property of type string!\nThis property is used to set the current active theme.');
    }
};
exports.validateNestThemeConfig = validateNestThemeConfig;
const validateFullThemeConfig = (fullThemeConfig) => {
    (0, exports.validateThemeConfig)(fullThemeConfig);
    (0, exports.validateNestThemeConfig)(fullThemeConfig);
};
exports.validateFullThemeConfig = validateFullThemeConfig;
const loadConfig = async (searchConfigPaths, env) => {
    for (const configPath of searchConfigPaths) {
        if (!(0, fs_1.existsSync)(configPath)) {
            continue;
        }
        if (configPath.endsWith('.js')) {
            const config = await Promise.resolve().then(() => require(configPath));
            return config(env);
        }
        else if (configPath.endsWith('.ts')) {
            const { transpileModule, ModuleKind } = await Promise.resolve().then(() => require('typescript'));
            const tSource = await (0, promises_1.readFile)(configPath, 'utf8');
            const compilerOptions = {
                module: ModuleKind.CommonJS,
            };
            const context = {
                exports: {
                    config: undefined,
                },
                require,
            };
            let jSource = transpileModule(tSource, {
                compilerOptions,
            }).outputText;
            let script = new vm_1.Script(jSource);
            script.runInNewContext(context);
            if (!context.exports.config) {
                throw new Error(`The theme condig file "${configPath}" needs to export a config method!`);
            }
            const themeConfig = context.exports.config(env);
            script = null;
            jSource = null;
            return themeConfig;
        }
        else if (configPath.endsWith('.yaml')) {
            const result = YAML.parse(await (0, promises_1.readFile)(configPath, 'utf8'));
            return result;
        }
        else {
            throw new Error('Config file extension not supported! ' + configPath);
        }
    }
    throw new Error('No config file found! Searched for config files: \n' +
        JSON.stringify(searchConfigPaths, null, 2));
};
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map