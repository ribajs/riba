"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const typescript_1 = require("typescript");
const vm_1 = require("vm");
const YAML = require("yaml");
const fs_1 = require("fs");
const loadConfig = (configPath) => {
    if (configPath.endsWith('.ts')) {
        const tSource = fs_1.readFileSync(configPath, 'utf8');
        const compilerOptions = {
            module: typescript_1.ModuleKind.CommonJS,
        };
        const context = {
            exports: {
                themeConfig: {},
            },
            require,
        };
        const jSource = typescript_1.transpileModule(tSource, { compilerOptions }).outputText;
        const script = new vm_1.Script(jSource);
        script.runInNewContext(context);
        return context.exports.themeConfig;
    }
    if (configPath.endsWith('.yaml')) {
        const result = YAML.parse(fs_1.readFileSync(configPath, 'utf8'));
        return result;
    }
};
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map