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
const store_console_1 = require("./store-console");
const ignore_console_1 = require("./ignore-console");
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
                ...req,
                errorObj: req.errorObj || errorObj,
                status: errorObj?.statusCode || req?.status || 200,
            },
            env: process.env,
            templateVars,
        };
        return sharedContext;
    }
    async createDomForLayout(layout, output = "pipe") {
        const virtualConsole = new jsdom_1.VirtualConsole({
            captureRejections: true,
        });
        let pipeToConsole;
        switch (output) {
            case "pipe":
                pipeToConsole = console;
                break;
            case "store":
                pipeToConsole = new store_console_1.StoreConsole();
                break;
            case "ignore":
                pipeToConsole = new ignore_console_1.IgnoreConsole();
                break;
            default:
                pipeToConsole = new ignore_console_1.IgnoreConsole();
                break;
        }
        virtualConsole.sendTo(pipeToConsole);
        const dom = new jsdom_1.JSDOM(layout, {
            virtualConsole,
            runScripts: "outside-only",
            includeNodeLocations: true,
            beforeParse(window) {
                if (!window.fetch) {
                    window.fetch = node_fetch_1.default;
                }
                window.console = pipeToConsole;
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
        return { dom, virtualConsole, pipeToConsole };
    }
    async render(layout, sharedContext, scriptFilenames = ["main.bundle.js"], output = "pipe") {
        sharedContext = sharedContext || (await this.getSharedContext());
        if (!sharedContext?.events) {
            sharedContext.events = new events_1.EventDispatcher();
        }
        const { dom, virtualConsole, pipeToConsole } = await this.createDomForLayout(layout, output);
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
                const output = [];
                if (pipeToConsole.type === "store") {
                    output.push(...pipeToConsole.messages);
                }
                reject(this.transformBrowserError(error, output));
                clear();
                return true;
            };
            const onDone = (lifecycleEventData) => {
                if (!dom) {
                    throw new Error("Dom is not defined!");
                }
                const html = dom.serialize();
                const result = {
                    ...lifecycleEventData,
                    html: html,
                    css: [],
                };
                if (output === "store" && pipeToConsole.type === "store") {
                    result.output = pipeToConsole.messages;
                }
                resolve(result);
                clear();
                return;
            };
            const clear = () => {
                virtualConsole?.off("jsdomError", onError);
                if (!sharedContext?.events) {
                    throw new Error("events are required in sharedContext object!");
                }
                sharedContext?.events?.off("error", onError, this);
                sharedContext?.events?.off("ready", onDone, this);
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
            };
            if (!sharedContext?.events) {
                throw new Error("events are required in sharedContext object!");
            }
            sharedContext?.events.once("ready", onDone, this);
            virtualConsole?.on("jsdomError", onError);
            sharedContext?.events.once("error", onError, this);
            dom?.window.addEventListener("error", onError);
        });
        return renderResult;
    }
    transformBrowserError(error, output) {
        const message = error.message;
        if (output.length) {
            message + "\n" + this.logToErrorMessage(output);
        }
        const newError = new Error(message);
        if (error.stack) {
            newError.stack = error.stack;
        }
        if (error.status) {
            newError.status = error.status;
        }
        return newError;
    }
    async renderComponent({ componentTagName, sharedContext, templateFile = this.options.defaultTemplateFile, rootTag = this.options.defaultRootTag, output = "pipe", }) {
        sharedContext = sharedContext || (await this.getSharedContext());
        const template = await this.templateFile.load(templateFile, rootTag, componentTagName, {
            env: sharedContext.env,
            templateVars: sharedContext.templateVars,
        });
        try {
            return await this.render(template.layout, sharedContext, undefined, output);
        }
        catch (error) {
            this.log.error(`Error on render component! rootTag: "${rootTag}"`);
            this.log.error(error);
            throw error;
        }
    }
    logOutput(logs) {
        if (logs?.length) {
            this.log.log("[SsrService] Console output:");
            for (const log of logs) {
                this.log[log.type](log.message, ...(log.optionalParams || []));
            }
        }
    }
    logToErrorMessage(logs) {
        logs = logs.filter((log) => log.type === "error" || log.type === "warn");
        return logs
            .map((log) => {
            return JSON.stringify(log);
        })
            .join("\n");
    }
}
exports.SsrService = SsrService;
//# sourceMappingURL=ssr.service.js.map