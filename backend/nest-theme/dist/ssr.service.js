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
const server_rendering_1 = require("@happy-dom/server-rendering");
const vm_1 = require("vm");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const consolidate = require("consolidate");
const fs_1 = require("fs");
const events_1 = require("@ribajs/events");
let SsrService = class SsrService {
    constructor(config) {
        this.log = new common_1.Logger(this.constructor.name);
        this.theme = config.get('theme');
    }
    isRenderEngineValid(engine) {
        switch (engine) {
            case 'happy-dom':
                return true;
            case 'jsdom':
                return true;
            default:
                return false;
                break;
        }
    }
    async getSharedContext(req) {
        const sharedContext = {
            events: events_1.EventDispatcher.getInstance('ssr'),
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
            },
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
            console.error(`Template engine not installed, try to run "yarn add ${detected}"`);
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
            console.debug('scriptPath', scriptPath);
            const scriptSource = await fs_1.promises.readFile(scriptPath, 'utf8');
            this.log.debug('Scripts readed!');
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
        this.log.debug(`Template engine: ${tplEngine}, path: ${templatePath}`);
        try {
            const result = await consolidate[tplEngine](path_1.resolve(viewsDir, templatePath), variables);
            return result;
        }
        catch (error) {
            this.log.error('Error on render template');
            console.error(error);
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
        const window = vmContext.window;
        window.ssr = sharedContext;
        this.log.debug('Execute scripts...');
        for (const script of scripts) {
            await script.runInContext(vmContext);
        }
        this.log.debug('Wait for custom element...');
        this.log.debug('Scripts executed!');
        return new Promise((resolve, reject) => {
            sharedContext.events.once('PageComponent:afterBind', (afterBindData) => {
                const html = dom.serialize();
                const result = Object.assign(Object.assign({}, afterBindData), { html: html, css: [] });
                return resolve(result);
            });
            dom.window.addEventListener('error', (event) => {
                console.error(event);
                return reject(event);
            });
        });
    }
    async renderWithHappyDom(layout, componentTagName, sharedContext, scriptFilenames = ['main.bundle.js']) {
        const context = new server_rendering_1.HappyDOMContext();
        const window = context.window;
        window.ssr = sharedContext;
        const scriptSources = await this.readSsrScripts(scriptFilenames);
        const scripts = [];
        for (const [filename, scriptSource] of scriptSources) {
            const script = new vm_1.Script(scriptSource, {
                filename,
            });
            scripts.push(script);
        }
        const ssrResultPromise = context.render({
            html: layout,
            scripts,
            customElements: {
                openShadowRoots: false,
                extractCSS: false,
                scopeCSS: false,
                addCSSToHead: false,
            },
        });
        const result = await new Promise((resolve, reject) => {
            sharedContext.events.once('PageComponent:afterBind', async (afterBindData) => {
                const ssrResult = await ssrResultPromise;
                const result = Object.assign(Object.assign({}, afterBindData), { html: ssrResult.html, css: ssrResult.css });
                return resolve(result);
            });
            window.addEventListener('error', (event) => {
                console.error(event);
                return reject(event);
            });
        });
        return result;
    }
    async renderComponent({ template, rootTag = 'ssr-root-page', componentTagName, engine, sharedContext, }) {
        if (!rootTag) {
            rootTag = this.theme.ssr.rootTag || 'ssr-root-page';
        }
        if (engine && !this.isRenderEngineValid(engine)) {
            this.log.warn(`Ignore unknown render engine "${engine}"`);
        }
        if (!engine) {
            engine = this.theme.ssr.engine || 'jsdom';
        }
        if (!template) {
            template = this.theme.ssr.template || 'page-component.pug';
        }
        this.log.debug(`rootTag: ${rootTag}`);
        this.log.debug(`engine: ${engine}`);
        this.log.debug(`template: ${template}`);
        let layout = await this.renderTemplate(template, sharedContext);
        layout = await this.transformLayout(layout, rootTag, componentTagName);
        try {
            const renderData = engine === 'jsdom'
                ? await this.renderWithJSDom(layout, componentTagName, sharedContext)
                : await this.renderWithHappyDom(layout, componentTagName, sharedContext);
            return renderData;
        }
        catch (error) {
            this.log.error(`Error on render component with ${engine}`);
            console.error(error);
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