"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsrService = void 0;
const jsdom_1 = require("jsdom");
const node_fetch_1 = __importDefault(require("node-fetch"));
const events_1 = require("@ribajs/events");
const source_file_service_1 = require("./source-file.service");
const template_file_service_1 = require("./template-file.service");
const dummy_console_1 = require("./dummy-console");
class SsrService {
    constructor(options) {
        this.log = console;
        options.defaultRootTag = options.defaultRootTag || "ssr-root-page";
        options.defaultTemplateFile =
            options.defaultTemplateFile || "page-component.pug";
        options.defaultTemplateEngine = options.defaultTemplateEngine || "pug";
        if (!options.sourceFileDir) {
            throw new Error("[SsrService] The sourceFileDir option is required!");
        }
        if (!options.templateDir) {
            throw new Error("[SsrService] The templateDir option is required!");
        }
        this.options = options;
        this.sourceFile = new source_file_service_1.SourceFileService(options.sourceFileDir);
        this.templateFile = new template_file_service_1.TemplateFileService(options.templateDir, options.defaultTemplateEngine);
    }
    async getSharedContext(req = {}, templateVars = {}, errorObj) {
        const sharedContext = {
            events: new events_1.EventDispatcher(),
            ctx: {
                hostname: req.hostname,
                method: req.method,
                params: req.params,
                protocol: req.protocol,
                query: req.query,
                errorObj: errorObj,
                status: errorObj?.statusCode || req.status || 200,
            },
            env: process.env,
            templateVars,
        };
        return sharedContext;
    }
    async createDomForLayout(layout) {
        const virtualConsole = new jsdom_1.VirtualConsole();
        virtualConsole.sendTo(console);
        const dom = new jsdom_1.JSDOM(layout, {
            virtualConsole,
            runScripts: "outside-only",
            includeNodeLocations: true,
            beforeParse(window) {
                if (!window.fetch) {
                    window.fetch = node_fetch_1.default;
                }
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = () => {
                    };
                }
                if (!window.indexedDB) {
                    window.indexedDB = {
                        open: () => {
                            return {};
                        },
                    };
                }
            },
        });
        return { dom, virtualConsole };
    }
    async render(layout, sharedContext, scriptFilenames = ["main.bundle.js"]) {
        sharedContext = sharedContext || (await this.getSharedContext());
        let { dom, virtualConsole } = (await this.createDomForLayout(layout));
        if (!dom) {
            throw new Error("Dom not defined!");
        }
        dom.window.ssr = sharedContext;
        let files = await this.sourceFile.loads(scriptFilenames);
        let vmContext = dom.getInternalVMContext();
        for (const file of files || []) {
            try {
                await file.script.runInContext(vmContext, {
                    timeout: this.options.timeout || 5000,
                });
            }
            catch (error) {
                this.log.error("Error on run script");
                this.log.error(error);
                throw error;
            }
        }
        const renderResult = new Promise((resolve, reject) => {
            const onError = (error) => {
                this.log.error("SSR error");
                reject(this.transformBrowserError(error));
                clear();
                return true;
            };
            const onDone = (lifecycleEventData) => {
                this.log.debug("[Riba lifecycle] Done.");
                if (!dom) {
                    throw new Error("Dom is not defined!");
                }
                const html = dom.serialize();
                const result = {
                    ...lifecycleEventData,
                    html: html,
                    css: [],
                };
                resolve(result);
                clear();
                return;
            };
            const clear = () => {
                virtualConsole?.sendTo(new dummy_console_1.DummyConsole());
                virtualConsole?.off("jsdomError", onError);
                sharedContext?.events.off("error", onError, this);
                sharedContext?.events.off("ready", onDone, this);
                if (typeof dom?.window?.removeEventListener === "function") {
                    dom.window.removeEventListener("error", onError);
                }
                if (typeof dom?.window?.dispatchEvent === "function" &&
                    dom.window.Event) {
                    dom.window.dispatchEvent(new dom.window.Event("beforeunload"));
                }
                if (typeof dom?.window?.close === "function") {
                    dom.window.close();
                }
                if (typeof dom?.window?.document?.write === "function") {
                    dom.window.document.write();
                }
                files = null;
                vmContext = null;
                virtualConsole = null;
                dom = null;
            };
            sharedContext?.events.once("ready", onDone, this);
            virtualConsole?.on("jsdomError", onError);
            sharedContext?.events.once("error", onError, this);
            dom?.window.addEventListener("error", onError);
        });
        this.log.debug("[Riba lifecycle] Wait...");
        return renderResult;
    }
    transformBrowserError(error) {
        const newError = new Error(error.message);
        if (error.stack) {
            newError.stack = error.stack;
        }
        if (error.status) {
            newError.status = error.status;
        }
        return newError;
    }
    async renderComponent({ componentTagName, sharedContext, templateFile = this.options.defaultTemplateFile, rootTag = this.options.defaultRootTag, }) {
        sharedContext = sharedContext || (await this.getSharedContext());
        const template = await this.templateFile.load(templateFile, rootTag, componentTagName, {
            env: sharedContext.env,
            templateVars: sharedContext.templateVars,
        });
        try {
            return await this.render(template.layout, sharedContext);
        }
        catch (error) {
            this.log.error(`Error on render component! rootTag: "${rootTag}"`);
            this.log.error(error);
            throw error;
        }
    }
}
exports.SsrService = SsrService;
//# sourceMappingURL=ssr.service.js.map