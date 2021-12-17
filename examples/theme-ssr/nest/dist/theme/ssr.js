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
exports.Ssr = void 0;
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
const server_rendering_1 = require("@happy-dom/server-rendering");
const vm_1 = require("vm");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const renderEngine = require("consolidate");
const fs_1 = require("fs");
const event_dispatcher_service_1 = require("./event-dispatcher.service");
let Ssr = class Ssr {
    constructor(config) {
        this.config = config;
    }
    getSharedContext() {
        return {
            ssrEvents: event_dispatcher_service_1.EventDispatcher.getInstance('ssr'),
        };
    }
    getTemplateEingine(templatePath) {
        const ext = path_1.extname(templatePath);
        const def = this.config.get('theme.viewEngine');
        const detected = (ext === null || ext === void 0 ? void 0 : ext.substring(1)) || def;
        if (detected !== def) {
            console.warn(`Detected template engine is not the default: "${detected}" (Default: "${def}")'`);
        }
        return detected;
    }
    async transformLayout(layout, placeholderPageTag, pageTag) {
        layout = layout.replace(new RegExp(placeholderPageTag, 'gi'), pageTag);
        return layout;
    }
    async readSsrScripts() {
        const assetsPath = this.config.get('theme.assetsDir');
        const vendorPath = path_1.resolve(assetsPath, 'ssr', 'vendors.bundle.js');
        const mainPath = path_1.resolve(assetsPath, 'ssr', 'main.bundle.js');
        console.debug('vendorPath', vendorPath);
        console.debug('mainPath', mainPath);
        const vendors = await fs_1.promises.readFile(vendorPath, 'utf8');
        const main = await fs_1.promises.readFile(mainPath, 'utf8');
        console.debug('Scripts readed!');
        return {
            vendors,
            main,
        };
    }
    async renderTemplate(templatePath, variables) {
        if (!path_1.extname(templatePath)) {
            templatePath += '.' + this.config.get('theme.viewEngine');
        }
        const viewsDir = this.config.get('theme.viewsDir');
        const eingine = this.getTemplateEingine(templatePath);
        const result = await renderEngine[eingine](path_1.resolve(viewsDir, templatePath), variables);
        return result;
    }
    async renderWithJSDom(layout, componentTagName) {
        const sharedContext = this.getSharedContext();
        const virtualConsole = new jsdom_1.VirtualConsole();
        virtualConsole.sendTo(console);
        const dom = new jsdom_1.JSDOM(layout, {
            virtualConsole,
            runScripts: 'outside-only',
            includeNodeLocations: true,
        });
        const { vendors, main } = await this.readSsrScripts();
        const script = new vm_1.Script(vendors + ' ' + main, {
            filename: 'vender-main.js',
        });
        const vmContext = dom.getInternalVMContext();
        vmContext.window.ssrEvents = sharedContext.ssrEvents;
        console.debug('Execute scripts...');
        script.runInContext(vmContext);
        console.debug('Wait for custom element...');
        await dom.window.customElements.whenDefined('index-page');
        const riba = dom.window.riba;
        const view = dom.window.view;
        const component = riba.components[componentTagName] ||
            view.options.components[componentTagName] ||
            null;
        console.debug('Scripts executed!');
        return new Promise((resolve, reject) => {
            sharedContext.ssrEvents.once('PageComponent:afterBind', (afterBindData) => {
                const html = dom.serialize();
                const result = {
                    component: afterBindData,
                    html: html,
                };
                result.component.tagName =
                    result.component.tagName || component.tagName || componentTagName;
                console.debug('result', result);
                return resolve(result);
            });
            dom.window.addEventListener('error', (event) => {
                console.error(event);
                return reject(event);
            });
        });
    }
    async renderWithHappyDom(layout, componentTagName) {
        const context = new server_rendering_1.HappyDOMContext();
        const sharedContext = this.getSharedContext();
        const window = context.window;
        window.ssrEvents = sharedContext.ssrEvents;
        const { vendors, main } = await this.readSsrScripts();
        const vendorsScript = new vm_1.Script(vendors, {
            filename: 'vendor.bundle.js',
        });
        const mainScript = new vm_1.Script(main, {
            filename: 'main.bundle.js',
        });
        const ssrResultPromise = context.render({
            html: layout,
            scripts: [vendorsScript, mainScript],
            customElements: {
                openShadowRoots: false,
                extractCSS: false,
                scopeCSS: false,
                addCSSToHead: false,
            },
        });
        const result = await new Promise((resolve, reject) => {
            sharedContext.ssrEvents.once('PageComponent:afterBind', async (afterBindData) => {
                const ssrResult = await ssrResultPromise;
                const riba = window.riba;
                const view = window.view;
                const component = riba.components[componentTagName] ||
                    view.options.components[componentTagName] ||
                    null;
                const result = {
                    component: {
                        tagName: component.tagName,
                    },
                    html: ssrResult.html,
                    css: ssrResult.css,
                };
                result.component.tagName =
                    result.component.tagName || component.tagName || componentTagName;
                result.component = Object.assign(Object.assign({}, result.component), afterBindData);
                console.debug('result', result);
                return resolve(result);
            });
            window.addEventListener('error', (event) => {
                console.error(event);
                return reject(event);
            });
        });
        return result;
    }
    async renderComponent(opt) {
        let layout = await this.renderTemplate(opt.templatePath, opt.variables);
        layout = await this.transformLayout(layout, opt.placeholderPageTag, opt.componentTagName);
        const renderData = opt.engine === 'jsdom'
            ? await this.renderWithJSDom(layout, opt.componentTagName)
            : await this.renderWithHappyDom(layout, opt.componentTagName);
        return renderData;
    }
};
Ssr = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Ssr);
exports.Ssr = Ssr;
//# sourceMappingURL=ssr.js.map