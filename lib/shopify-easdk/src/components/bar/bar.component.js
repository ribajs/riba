"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const index_1 = require("../../index");
const bar_component_pug_1 = __importDefault(require("./bar.component.pug"));
class BarComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.bar = new index_1.shopifyEasdkModule.services.BarWrapperService();
        this.debug = core_1.Debug('component:' + BarComponent.tagName);
        this.scope = {
            showFallbackBar: false,
        };
        this.$el = core_1.JQuery(this.el);
        this.debug('constructor', this);
        this.init(BarComponent.observedAttributes);
        this.listenForConfigChanges();
    }
    static get observedAttributes() {
        return ['buttons', 'title', 'icon', 'pagination', 'breadcrumb', 'loading', 'show-fallback-bar'];
    }
    listenForConfigChanges() {
        this.bar.event.on('bar:setShowFallbackBar', (showFallbackBar) => {
            this.scope.showFallbackBar = showFallbackBar;
            this.debug('bar:showFallbackBar', showFallbackBar);
        });
        this.bar.event.on('bar:initialize', (fallback, config) => {
            if (this.scope.buttons !== config.buttons) {
                this.scope.buttons = config.buttons;
            }
            if (this.scope.breadcrumb !== config.breadcrumb) {
                this.scope.breadcrumb = config.breadcrumb;
            }
            if (this.scope.title !== config.title) {
                this.scope.title = config.title;
            }
            if (this.scope.icon !== config.icon) {
                this.scope.icon = config.icon;
            }
            if (this.scope.pagination !== config.pagination) {
                this.scope.pagination = config.pagination;
            }
            this.debug('bar:initialize', fallback, config);
        });
        this.bar.event.on('bar:setTitle', (fallback, title) => {
            if (this.scope.title !== title) {
                this.scope.title = title;
            }
            this.debug('bar:setTitle', fallback, title);
        });
        this.bar.event.on('bar:loading', (fallback, loading) => {
            if (this.scope.loading !== loading.on) {
                this.scope.loading = loading.on;
            }
            this.debug('bar:loading', fallback, loading);
        });
        this.bar.event.on('bar:setPagination', (fallback, pagination) => {
            if (this.scope.pagination !== pagination) {
                this.scope.pagination = pagination;
            }
            this.debug('bar:setPagination', fallback, pagination);
        });
        this.bar.event.on('bar:setBreadcrumb', (fallback, breadcrumb) => {
            if (this.scope.breadcrumb !== breadcrumb) {
                this.scope.breadcrumb = breadcrumb;
            }
            this.debug('bar:setBreadcrumb', fallback, breadcrumb);
        });
    }
    async beforeBind() {
        this.scope.buttons = this.bar.buttons;
        this.scope.breadcrumb = this.bar.breadcrumb;
        this.scope.title = this.bar.title;
        this.scope.icon = this.bar.icon;
        this.scope.pagination = this.bar.pagination;
        this.scope.showFallbackBar = this.bar.showFallbackBar;
        this.debug('beforeBind');
    }
    async afterBind() {
        this.debug('afterBind', this.scope);
    }
    requiredAttributes() {
        return [];
    }
    // deconstructor
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
        if (attributeName === 'buttons') {
            this.bar.initialize(this.scope);
        }
        if (attributeName === 'title') {
            this.bar.setTitle(this.scope.title);
        }
        if (attributeName === 'title' && this.scope.icon) {
            this.bar.setIcon(this.scope.icon);
        }
        if (attributeName === 'pagination') {
            this.bar.setPagination(this.scope.pagination);
        }
        if (attributeName === 'breadcrumb') {
            this.bar.setBreadcrumb(this.scope.breadcrumb);
        }
        if (attributeName === 'loading') {
            if (this.scope.loading) {
                this.bar.loadingOn();
            }
            else {
                this.bar.loadingOff();
            }
        }
        if (attributeName === 'show-fallback-bar') {
            this.bar.setShowFallbackBar(this.scope.showFallbackBar);
        }
    }
    template() {
        let template = null;
        // Only set the component template if there no childs already
        if (this.el.hasChildNodes()) {
            this.debug('Do not template, because element has child nodes');
            return template;
        }
        else {
            template = bar_component_pug_1.default(this.scope);
            this.debug('Use template', template);
            return template;
        }
    }
}
exports.BarComponent = BarComponent;
BarComponent.tagName = 'rv-shopify-easdk-bar';
