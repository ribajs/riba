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
const Brakes = require("brakes");
const vm_1 = require("vm");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const consolidate = require("consolidate");
const fs_1 = require("fs");
const node_fetch_1 = require("node-fetch");
const events_1 = require("@ribajs/events");
let SsrService = class SsrService {
    constructor(config) {
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
    getTemplateEngine(templatePath) {
        const ext = path_1.extname(templatePath);
        const def = this.theme.viewEngine;
        const detected = (ext === null || ext === void 0 ? void 0 : ext.substring(1)) || def;
        if (detected !== def) {
            this.log.warn(`Detected template engine is not the default: "${detected}" (Default: "${def}")'`);
        }
        try {
            require.resolve(detected);
        }
        catch (error) {
            this.log.error(`Template engine not installed, try to run "yarn add ${detected}"`);
        }
        return detected;
    }
    async transformLayout(layout, rootTag, pageTag) {
        layout = layout.replace(new RegExp(rootTag, 'gi'), pageTag);
        return layout;
    }
    async readSsrScripts(filenames) {
        const scripts = new Map();
        const assetsDir = this.theme.assetsDir;
        const scriptsDir = path_1.resolve(assetsDir, 'ssr');
        for (const filename of filenames) {
            const scriptPath = path_1.resolve(scriptsDir, filename);
            const scriptSource = await fs_1.promises.readFile(scriptPath, 'utf8');
            scripts.set(filename, scriptSource);
        }
        return scripts;
    }
    async renderTemplate(templatePath, variables) {
        if (!path_1.extname(templatePath)) {
            templatePath += '.' + this.theme.viewEngine;
        }
        const viewsDir = this.theme.viewsDir;
        const tplEngine = this.getTemplateEngine(templatePath);
        templatePath = path_1.resolve(viewsDir, templatePath);
        try {
            const result = await consolidate[tplEngine](path_1.resolve(viewsDir, templatePath), variables);
            return result;
        }
        catch (error) {
            this.log.error('Error on render template');
            this.log.error(error);
            throw error;
        }
    }
    async renderWithJSDom(layout, componentTagName, sharedContext, scriptFilenames = ['main.bundle.js']) {
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
                window.ssr = sharedContext;
            },
        });
        const result = new Promise((resolve, reject) => {
            sharedContext.events.once('ready', (lifecycleEventData) => {
                const html = dom.serialize();
                const result = Object.assign(Object.assign({}, lifecycleEventData), { html: html, css: [] });
                return resolve(result);
            });
            sharedContext.events.once('error', (error) => {
                this.log.error('SSR error event: ' + error);
                return reject(this.transformBrowserError(error));
            });
            dom.window.onerror = (msg, url, line, col, error) => {
                this.log.error('SSR window.onerror: ' + error);
                return reject(this.transformBrowserError(error));
            };
            dom.window.addEventListener('error', (error) => {
                this.log.error('SSR window error: ' + error);
                return reject(this.transformBrowserError(error));
            });
        });
        const scriptSources = await this.readSsrScripts(scriptFilenames);
        const scripts = [];
        for (const [filename, scriptSource] of scriptSources) {
            const script = new vm_1.Script(scriptSource, {
                filename,
            });
            scripts.push(script);
        }
        const vmContext = dom.getInternalVMContext();
        for (const script of scripts) {
            await script.runInContext(vmContext);
        }
        this.log.debug('Wait for custom element...');
        return result;
    }
    transformBrowserError(error) {
        const newError = new Error(error.message);
        if (error.stack) {
            newError.stack = error.stack;
        }
        return newError;
    }
    async renderComponent({ template, rootTag = 'ssr-root-page', componentTagName, sharedContext, }) {
        if (!rootTag) {
            rootTag = this.theme.ssr.rootTag || 'ssr-root-page';
        }
        if (!template) {
            template = this.theme.ssr.template || 'page-component.pug';
        }
        let layout = await this.renderTemplate(template, sharedContext);
        layout = await this.transformLayout(layout, rootTag, componentTagName);
        try {
            const render = async () => {
                return this.renderWithJSDom(layout, componentTagName, sharedContext);
            };
            const renderWithJSDom = new Brakes(render, {
                timeout: 20000,
            });
            const renderData = await renderWithJSDom.exec();
            return renderData;
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], SsrService);
exports.SsrService = SsrService;
//# sourceMappingURL=ssr.service.js.map