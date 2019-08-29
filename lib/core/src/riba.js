"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./services/utils");
const parsers_1 = require("./parsers");
const adapter_1 = require("./adapter");
const attribute_binder_1 = require("./binders/attribute.binder");
const view_1 = require("./view");
const observer_1 = require("./observer");
const module_service_1 = require("./services/module.service");
class Riba {
    /**
     * Creates an singleton instance of Riba.
     */
    constructor() {
        /** Global binders */
        this.binders = {};
        /** Global components. */
        this.components = {};
        /** Global formatters. */
        this.formatters = {};
        /** Global (sightglass) adapters. */
        this.adapters = {
            '.': adapter_1.adapter,
        };
        this.parseTemplate = parsers_1.parseTemplate;
        this.parseType = parsers_1.parseType;
        /** Default template delimiters. */
        this.templateDelimiters = ['{', '}'];
        /** Default sightglass root interface. */
        this.rootInterface = '.';
        /** Preload data by default. */
        this.preloadData = true;
        /** Default attribute prefix. */
        this._prefix = 'rv';
        /** Default attribute full prefix. */
        this._fullPrefix = 'rv-';
        this.module = new module_service_1.ModulesService(this.binders, this.components, this.formatters);
        if (Riba.instance) {
            return Riba.instance;
        }
        Riba.instance = this;
    }
    /**
     * Default event handler, calles the function defined in his binder
     * @see Binding.eventHandler
     * @param el The element the event was triggered from
     */
    static handler(context, ev, binding, el) {
        this.call(context, ev, binding.view.models, el);
    }
    set prefix(value) {
        this._prefix = value;
        this._fullPrefix = value + '-';
    }
    get prefix() {
        return this._prefix;
    }
    get fullPrefix() {
        return this._fullPrefix;
    }
    /**
     * Merges an object literal into the corresponding global options.
     * @param options
     */
    configure(options) {
        if (!options) {
            return;
        }
        Object.keys(options).forEach((option) => {
            const value = options[option];
            switch (option) {
                case 'binders':
                    this.binders = utils_1.Utils.concat(false, this.binders, value);
                    break;
                case 'formatters':
                    this.formatters = utils_1.Utils.concat(false, this.formatters, value);
                    break;
                case 'components':
                    this.components = utils_1.Utils.concat(false, this.components, value);
                    break;
                case 'adapters':
                    this.adapters = utils_1.Utils.concat(false, this.adapters, value);
                    break;
                case 'adapter':
                    this.adapters = utils_1.Utils.concat(false, this.adapters, value);
                    break;
                case 'prefix':
                    this.prefix = value;
                    break;
                case 'parseTemplate':
                    this.parseTemplate = value;
                    break;
                case 'parseType':
                    this.parseType = value;
                    break;
                case 'templateDelimiters':
                    this.templateDelimiters = value;
                    break;
                case 'rootInterface':
                    this.rootInterface = value;
                    break;
                case 'preloadData':
                    this.preloadData = value;
                    break;
                default:
                    console.warn('Option not supported', option, value);
                    break;
            }
        });
    }
    getViewOptions(options) {
        const viewOptions = {
            // EXTENSIONS
            adapters: {},
            binders: {},
            components: {},
            formatters: {},
            // other
            starBinders: {},
            // sightglass
            rootInterface: {},
            // Remove binder attributes after binding
            removeBinderAttributes: true,
        };
        if (options) {
            viewOptions.binders = utils_1.Utils.concat(false, viewOptions.binders, options.binders);
            viewOptions.formatters = utils_1.Utils.concat(false, viewOptions.formatters, options.formatters);
            viewOptions.components = utils_1.Utils.concat(false, viewOptions.components, options.components);
            viewOptions.adapters = utils_1.Utils.concat(false, viewOptions.adapters, options.adapters);
        }
        viewOptions.prefix = options && options.prefix ? options.prefix : this.prefix;
        viewOptions.fullPrefix = viewOptions.prefix ? viewOptions.prefix + '-' : this.fullPrefix;
        viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : this.templateDelimiters;
        viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : this.rootInterface;
        viewOptions.preloadData = options && options.preloadData ? options.preloadData : this.preloadData;
        viewOptions.handler = options && options.handler ? options.handler : Riba.handler;
        // merge extensions
        viewOptions.binders = utils_1.Utils.concat(false, this.binders, viewOptions.binders);
        viewOptions.formatters = utils_1.Utils.concat(false, this.formatters, viewOptions.formatters);
        viewOptions.components = utils_1.Utils.concat(false, this.components, viewOptions.components);
        viewOptions.adapters = utils_1.Utils.concat(false, this.adapters, viewOptions.adapters);
        // get all starBinders from available binders
        if (viewOptions.binders) {
            viewOptions.starBinders = Object.keys(viewOptions.binders).filter((key) => {
                return key.indexOf('*') >= 1; // Should ot start with *
            });
        }
        return viewOptions;
    }
    /**
     * Binds some data to a template / element. Returns a riba.View instance.
     */
    bind(el, models, options) {
        const viewOptions = this.getViewOptions(options);
        models = models || new Object(null);
        observer_1.Observer.updateOptions(viewOptions);
        const view = new view_1.View(el, models, viewOptions);
        view.bind();
        return view;
    }
}
exports.Riba = Riba;
/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
Riba.fallbackBinder = attribute_binder_1.starBinder;
