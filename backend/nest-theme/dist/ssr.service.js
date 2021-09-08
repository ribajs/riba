"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsrService = void 0;
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const events_1 = require("@ribajs/events");
const source_file_service_1 = require("./source-file/source-file.service");
const template_file_service_1 = require("./template-file/template-file.service");
const dummy_console_1 = require("./helper/dummy-console");
let SsrService = class SsrService {
    constructor(config, sourceFile, templateFile) {
        this.sourceFile = sourceFile;
        this.templateFile = templateFile;
        this.log = new common_1.Logger(this.constructor.name);
        this.theme = config.get('theme');
    }
    async getSharedContext(req, templateVars, errorObj) {
        const sharedContext = {
            events: new events_1.EventDispatcher(),
            ctx: {
                app: req.app,
                baseUrl: req.baseUrl,
                body: req.body,
                cookies: req.cookies,
                fresh: req.fresh,
                hostname: req.hostname,
                ip: req.ip,
                ips: req.ips,
                method: req.method,
                originalUrl: req.originalUrl,
                params: req.params,
                path: req.path,
                protocol: req.protocol,
                query: req.query,
                route: req.route,
                secure: req.secure,
                signedCookies: req.signedCookies,
                stale: req.stale,
                subdomains: req.subdomains,
                xhr: req.xhr,
                errorObj: errorObj,
                status: (errorObj === null || errorObj === void 0 ? void 0 : errorObj.statusCode) || req.statusCode || 200,
            },
            env: process.env,
            templateVars: templateVars.get(),
        };
        return sharedContext;
    }
    async createDomForLayout(layout) {
        const virtualConsole = new jsdom_1.VirtualConsole();
        virtualConsole.sendTo(console);
        const dom = new jsdom_1.JSDOM(layout, {
            virtualConsole,
            runScripts: 'outside-only',
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
    async render(layout, sharedContext, scriptFilenames = ['main.bundle.js']) {
        let { dom, virtualConsole } = await this.createDomForLayout(layout);
        dom.window.ssr = sharedContext;
        let files = await this.sourceFile.loads(scriptFilenames);
        let vmContext = dom.getInternalVMContext();
        for (const file of files) {
            try {
                await file.script.runInContext(vmContext, {
                    timeout: this.theme.timeout || 5000,
                });
            }
            catch (error) {
                this.log.error('Error on run script');
                this.log.error(error);
                throw error;
            }
        }
        const renderResult = new Promise((resolve, reject) => {
            const onError = (error) => {
                this.log.error('SSR error');
                reject(this.transformBrowserError(error));
                clear();
                return true;
            };
            const onDone = (lifecycleEventData) => {
                this.log.debug('[Riba lifecycle] Done.');
                const html = dom.serialize();
                const result = Object.assign(Object.assign({}, lifecycleEventData), { html: html, css: [] });
                resolve(result);
                clear();
                return;
            };
            const clear = () => {
                var _a, _b, _c, _d, _e;
                virtualConsole.sendTo(new dummy_console_1.DummyConsole());
                virtualConsole.off('jsdomError', onError);
                sharedContext.events.off('error', onError, this);
                sharedContext.events.off('ready', onDone, this);
                if (typeof ((_a = dom === null || dom === void 0 ? void 0 : dom.window) === null || _a === void 0 ? void 0 : _a.removeEventListener) === 'function') {
                    dom.window.removeEventListener('error', onError);
                }
                if (typeof ((_b = dom === null || dom === void 0 ? void 0 : dom.window) === null || _b === void 0 ? void 0 : _b.dispatchEvent) === 'function' &&
                    dom.window.Event) {
                    dom.window.dispatchEvent(new dom.window.Event('beforeunload'));
                }
                if (typeof ((_c = dom === null || dom === void 0 ? void 0 : dom.window) === null || _c === void 0 ? void 0 : _c.close) === 'function') {
                    dom.window.close();
                }
                if (typeof ((_e = (_d = dom === null || dom === void 0 ? void 0 : dom.window) === null || _d === void 0 ? void 0 : _d.document) === null || _e === void 0 ? void 0 : _e.write) === 'function') {
                    dom.window.document.write();
                }
                files = null;
                vmContext = null;
                virtualConsole = null;
                dom = null;
            };
            sharedContext.events.once('ready', onDone, this);
            virtualConsole.on('jsdomError', onError);
            sharedContext.events.once('error', onError, this);
            dom.window.addEventListener('error', onError);
        });
        this.log.debug('[Riba lifecycle] Wait...');
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
    async renderComponent({ templatePath, rootTag = 'ssr-root-page', componentTagName, sharedContext, }) {
        rootTag = rootTag || this.theme.ssr.rootTag || 'ssr-root-page';
        templatePath =
            templatePath || this.theme.ssr.template || 'page-component.pug';
        const template = await this.templateFile.load(templatePath, rootTag, componentTagName, {
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
};
SsrService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        source_file_service_1.SourceFileService,
        template_file_service_1.TemplateFileService])
], SsrService);
exports.SsrService = SsrService;
//# sourceMappingURL=ssr.service.js.map