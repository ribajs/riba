"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("./parsers");
const observer_1 = require("./observer");
const utils_1 = require("./services/utils");
const vendors_1 = require("./vendors");
/**
 *  A single binding between a model attribute and a DOM element.
 */
class Binding {
    /**
     * All information about the binding is passed into the constructor; the
     * containing view, the DOM node, the type of binding, the model object and the
     * keypath at which to listen for changes.
     * @param {*} view
     * @param {*} el
     * @param {*} type
     * @param {*} keypath
     * @param {*} binder
     * @param {*} args The start binders, on `class-*` args[0] wil be the classname.
     * @param {*} formatters
     */
    constructor(view, el, type, keypath, binder, formatters, identifier) {
        this.formatterObservers = {};
        this.view = view;
        this.el = el;
        this.type = type;
        this.keypath = keypath;
        this.binder = binder;
        this.formatters = formatters;
        this.model = undefined;
        this.customData = {};
        this.debug = vendors_1.Debug('riba:Binding');
        if (identifier && type) {
            this.args = this.getStarArguments(identifier, type);
        }
        else {
            this.args = new Array();
        }
        // this.debug('constructor', this.args, identifier, type);
    }
    /**
     * Observes the object keypath
     * @param obj
     * @param keypath
     */
    observe(obj, keypath, callback) {
        return new observer_1.Observer(obj, keypath, callback);
    }
    parseTarget() {
        if (this.keypath) {
            const token = parsers_1.parseType(this.keypath);
            if (token.type === parsers_1.PRIMITIVE) {
                this.value = token.value;
            }
            else if (token.type === parsers_1.KEYPATH) {
                this.observer = this.observe(this.view.models, this.keypath, this);
                this.model = this.observer.target;
            }
            else {
                throw new Error(`[${this.binder.name}] Unknown type in token`);
            }
        }
        else {
            this.value = undefined;
        }
    }
    /**
     * Get the iteration alias, used in the interation binders like `each-*`
     * @param {*} modelName
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L26
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L1175
     */
    getIterationAlias(modelName) {
        return '%' + modelName + '%';
    }
    parseFormatterArguments(args, formatterIndex) {
        return args
            .map(parsers_1.parseType)
            .map(({ type, value }, ai) => {
            if (type === parsers_1.PRIMITIVE) {
                const primitiveValue = value;
                return primitiveValue;
            }
            else if (type === parsers_1.KEYPATH) {
                // keypath is string
                const keypath = value;
                if (!this.formatterObservers[formatterIndex]) {
                    this.formatterObservers[formatterIndex] = {};
                }
                let observer = this.formatterObservers[formatterIndex][ai];
                if (!observer) {
                    observer = this.observe(this.view.models, keypath, this);
                    this.formatterObservers[formatterIndex][ai] = observer;
                }
                return observer.value();
            }
            else {
                throw new Error(`[${this.binder.name}] Unknown argument type`);
            }
        });
    }
    /**
     * Applies all the current formatters to the supplied value and returns the
     * formatted value.
     */
    formattedValue(value) {
        if (this.formatters === null) {
            throw new Error(`[${this.binder.name} formatters is null`);
        }
        return this.formatters.reduce((result /*check type*/, declaration, index) => {
            const args = declaration.match(Binding.FORMATTER_ARGS);
            if (args === null) {
                console.warn(new Error(`[${this.binder.name}] No args matched with regex "FORMATTER_ARGS"!\nvalue: ${value}\nresult: ${result}\ndeclaration: ${declaration}\nindex: ${index}\n`));
                return result;
            }
            const id = args.shift();
            if (!id) {
                throw new Error(`[${this.binder.name}] No formatter id found in args!`);
            }
            if (!this.view.options.formatters) {
                throw new Error(`[${this.binder.name}] No formatters are defined!`);
            }
            const formatter = this.view.options.formatters[id];
            if (!formatter) {
                throw new Error(`[${this.binder.name}] No formatters with id "${id}" found!`);
            }
            const processedArgs = this.parseFormatterArguments(args, index);
            // get formatter read funcion
            if (formatter && typeof (formatter.read) === 'function') {
                result = formatter.read.apply(this.model, [result, ...processedArgs]);
            }
            return result;
        }, value);
    }
    /**
     * Returns an event handler for the binding around the supplied function.
     * Tihs event Handler is mainly used by the on-* binder
     * @param fn The function to call by the handler
     * @param el The element the event was triggered from
     */
    eventHandler(fn, el) {
        const binding = this;
        const handler = binding.view.options.handler;
        return (ev) => {
            if (!handler) {
                throw new Error('No handler defined in binding.view.options.handler');
            }
            handler.call(fn, this, ev, binding, el);
        };
    }
    /**
     * Sets the value for the binding. This Basically just runs the binding routine
     * with the supplied value formatted.
     */
    set(value) {
        if (this.binder === null) {
            console.warn(new Error('Binder is null'), this);
            return;
        }
        value = this.formattedValue(value);
        if (this.binder && typeof (this.binder.routine) === 'function') {
            // If value is a promise
            if (value && typeof (value.then) === 'function' && typeof (value.catch) === 'function') {
                value.then((realValue) => {
                    return this.binder.routine.call(this, this.el, realValue);
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
            else {
                this.binder.routine.call(this, this.el, value);
            }
        }
    }
    /**
     * Syncs up the view binding with the model.
     */
    sync() {
        if (this.observer) {
            this.model = this.observer.target;
            this.set(this.observer.value());
        }
        else {
            this.set(this.value);
        }
    }
    /**
     * Publishes the value currently set on the input element back to the model.
     */
    publish() {
        if (this.observer) {
            if (this.formatters === null) {
                throw new Error('formatters is null');
            }
            const value = this.formatters.reduceRight((result /*check type*/, declaration /*check type*/, index) => {
                const args = declaration.split(Binding.FORMATTER_SPLIT);
                const id = args.shift();
                if (!id) {
                    throw new Error('id not defined');
                }
                if (!this.view.options.formatters) {
                    return undefined;
                }
                const formatter = this.view.options.formatters[id];
                const processedArgs = this.parseFormatterArguments(args, index);
                if (formatter && typeof (formatter.publish) === 'function') {
                    result = formatter.publish(result, ...processedArgs);
                }
                return result;
            }, this.getValue(this.el));
            this.observer.setValue(value);
        }
    }
    /**
     * Subscribes to the model for changes at the specified keypath. Bi-directional
     * routines will also listen for changes on the element to propagate them back
     * to the model.
     */
    bind() {
        this.parseTarget();
        if (this.binder && this.binder.hasOwnProperty('bind')) {
            if (!this.binder.bind && typeof (this.binder.bind) !== 'function') {
                throw new Error('the method bind is not a function');
            }
            this.binder.bind.call(this, this.el);
        }
        if (this.view.options.preloadData) {
            this.sync();
        }
    }
    /**
     * Unsubscribes from the model and the element.
     */
    unbind() {
        if (!this.binder) {
            console.warn(new Error('Binder is not defined'), this);
            return;
        }
        if (this.binder.unbind) {
            this.binder.unbind.call(this, this.el);
        }
        if (this.observer) {
            this.observer.unobserve();
        }
        Object.keys(this.formatterObservers).forEach((fi) => {
            const args = this.formatterObservers[fi];
            Object.keys(args).forEach((ai) => {
                args[ai].unobserve();
            });
        });
        this.formatterObservers = {};
    }
    /**
     * Updates the binding's model from what is currently set on the view. Unbinds
     * the old model first and then re-binds with the new model.
     * @param {any} models
     */
    update(models = {}) {
        if (this.observer) {
            this.model = this.observer.target;
        }
        if (this.binder === null) {
            throw new Error('binder is null');
        }
        if (this.binder.hasOwnProperty('update')) {
            if (this.binder.update) {
                this.binder.update.call(this, models);
            }
        }
    }
    /**
     * Returns elements value
     * @param el
     */
    getValue(el) {
        if (this.binder === null) {
            throw new Error('binder is null');
        }
        if (this.binder.hasOwnProperty('getValue')) {
            if (typeof (this.binder.getValue) !== 'function') {
                throw new Error('getValue is not a function');
            }
            return this.binder.getValue.call(this, el);
        }
        else {
            return utils_1.Utils.getInputValue(el);
        }
    }
    getStarArguments(identifier, type) {
        const args = new Array();
        const regexp = new RegExp(`^${identifier.replace(/\*/g, '.+')}$`);
        if (regexp.test(type) && type.split('-')[0] === identifier.split('-')[0]) {
            this.debug('matches', identifier, type);
        }
        else {
            if (identifier !== '*') {
                console.error('Nodename not matchs the identifier,', identifier, type);
            }
        }
        const splittedIdentifier = identifier.split('*');
        // splittedIdentifier.pop();
        if (splittedIdentifier.length > 0) {
            // how many stars has the identifier?
            const starCount = splittedIdentifier.length - 1;
            if (starCount <= 1) {
                args.push(type.slice(identifier.length - 1));
            }
            else {
                /**
                 * On more than one star this is a multi star binder
                 * We split the identifier on each star and use the identifier pieces as a serperator
                 */
                const subIdentifier = splittedIdentifier[0];
                let argsString = type.slice(subIdentifier.length);
                splittedIdentifier.forEach((separator, index) => {
                    if (index > 0) {
                        let arg = argsString.split(separator)[0];
                        // the rest of the string
                        if (index === splittedIdentifier.length - 1) {
                            arg = argsString;
                        }
                        if (utils_1.Utils.isNumber(arg)) {
                            arg = Number(arg);
                        }
                        argsString = argsString.substring(argsString.indexOf(separator) + 1);
                        args.push(arg);
                    }
                });
            }
        }
        return args;
    }
}
exports.Binding = Binding;
Binding.FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
Binding.FORMATTER_SPLIT = /\s+/;
