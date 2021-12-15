import { resolve, extname } from "path";
import * as consolidate from "consolidate";
import { SUPPORTED_TEMPLATE_ENGINES } from "./constants";
export class TemplateFileService {
    constructor(dir, defaultEngine) {
        this.dir = dir;
        this.defaultEngine = defaultEngine;
        this.log = console;
    }
    getEngine(templatePath) {
        const ext = extname(templatePath);
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
        if (!SUPPORTED_TEMPLATE_ENGINES.includes(detected)) {
            throw new Error('The theme config must contain a "viewEngine" property of a supported template engine string!');
        }
        return detected;
    }
    normalizePath(path) {
        if (!extname(path)) {
            path = path + "." + this.defaultEngine;
        }
        if (!path.startsWith(this.dir)) {
            path = resolve(this.dir, path);
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
//# sourceMappingURL=template-file.service.js.map