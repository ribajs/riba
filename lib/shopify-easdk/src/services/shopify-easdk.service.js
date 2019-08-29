"use strict";
// rxjs
// import { Promise, Subscription, BehaviorSubject, Subject } from 'rxjs';
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:member-ordering variable-name */
const core_1 = require("@ribajs/core");
const wrapper_service_1 = require("./wrapper.service");
const shopify_easdk_bar_service_1 = require("./shopify-easdk-bar.service");
const shopify_easdk_modal_service_1 = require("./shopify-easdk-modal.service");
const shopify_easdk_user_service_1 = require("./shopify-easdk-user.service");
// import { AlertComponent } from './alert/alert.component';
// import { ConfirmComponent } from './confirm/confirm.component';
// import { OpenComponent } from './open/open.component';
class EASDKWrapperService extends wrapper_service_1.WrapperService {
    constructor(shopifyApp) {
        super(shopifyApp);
        this.event = new core_1.EventDispatcher('shopify-easdk');
        this.config = { shopOrigin: '', apiKey: '' };
        this.Bar = new shopify_easdk_bar_service_1.BarWrapperService(this.shopifyApp);
        this.Modal = new shopify_easdk_modal_service_1.ModalWrapperService(this.shopifyApp);
        this.User = new shopify_easdk_user_service_1.UserWrapperService(this.shopifyApp);
        if (EASDKWrapperService.instance) {
            return EASDKWrapperService.instance;
        }
        this.listenForMessage();
        EASDKWrapperService.instance = this;
    }
    /**
     * Receive EASDK messages and listen for them
     * Subscribe `message$' to get the messages!
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
     */
    listenForMessage() {
        window.addEventListener('message', (event) => {
            let data = {};
            let message = '';
            try {
                const _data = JSON.parse(event.data);
                data = _data.data;
                message = _data.message;
            }
            catch (error) {
                this.debug('Error on parse message data', error);
            }
            this.message = {
                message,
                data,
            };
            this.debug('Receive message:', event, message, data);
        }, false);
        this.event.on('bar:loading', (fallback, loading) => {
            this.debug('bar:loading', fallback, loading);
        });
        this.event.on('bar:loadingOn', (fallback, loading) => {
            this.debug('bar:loadingOn', fallback, loading);
        });
        this.event.on('bar:loadingOff', (fallback, loading) => {
            this.debug('bar:loadingOff', fallback, loading);
        });
        this.event.on('bar:setTitle', (fallback, title) => {
            this.debug('bar:setTitle', fallback, title);
        });
        this.event.on('bar:setIcon', (fallback, icon) => {
            this.debug('bar:setIcon', fallback, icon);
        });
        this.event.on('bar:setPagination', (fallback, config) => {
            this.debug('bar:setPagination', fallback, config);
        });
        this.event.on('bar:setBreadcrumb', (fallback, config) => {
            this.debug('bar:setBreadcrumb', fallback, config);
        });
    }
    /**
     * Should be called immediately after the script file has loaded,
     * as early as possible on the page (not in a jQuery.ready() or something).
     * It will initialize data values, add postMessage listeners,
     * check that the app is embedded in an iframe, and setup our initializers.
     */
    init(config) {
        this.config = config;
        this.shopifyApp.init(config);
        return;
    }
    /**
     * Works similarly to jQuery's ready() function.
     * It can be called many times on a page, it accepts functions,
     * and when the Admin and the app are loaded it will call the functions in order.
     *
     * ```
     * shopifyApp.ready(function(){
     *   alert("Ready");
     * });
     * ```
     */
    ready(cb) {
        return this.shopifyApp.ready(cb);
    }
    /**
     * Used to rewrite the current URL. This is called automatically and probably doesn't need to be explicitly called at all.
     *
     * @param {string} path The path to rewrite in the current URL outsite of the iframe
     * @returns {void}
     * @memberof EASDKWrapperService
     */
    pushState(path) {
        return this.shopifyApp.pushState(path);
    }
    /**
     * Displays a message in the Shopify admin chrome styled as a notice. Use only for successful or neutral messages.
     * `shopifyApp.flashNotice("Unicorn was created successfully.");`
     *
     * @param message The message to show
     * @param forceFallback Force the fallback mode which is used if you are not in the shopify iframe
     * @memberof EASDKWrapperService
     */
    flashNotice(message, forceFallback = false) {
        this.event.trigger('flashNotice', message, forceFallback);
        return this.shopifyApp.flashNotice(message);
    }
    /**
     * Displays a message in the Shopify admin chrome styled as an error. Use only for errors or failures.
     *
     * `shopifyApp.flashError("Unicorn could not be created.");`
     *
     * @param {string} message The message to show
     * @param {boolean} [forceFallback] Force the fallback mode which is used if you are not in the shopify iframe
     * @param {string} [action] Label for the optional action button, only available in fallback mode
     * @param {() => Promise<void>} [onAction] Promise which fires when the action button is clicked
     * @returns {void}
     * @memberof EASDKWrapperService
     */
    flashError(message, forceFallback = false) {
        this.event.trigger('flashError', message, forceFallback);
        return this.shopifyApp.flashError(message);
    }
    /**
     * Dispatches away from the app and into another section in the Shopify admin.
     * The path should be prefixed with a slash, but should not include the /admin part.
     * Example: /customers/120999015 or /settings/domains.
     *
     * @param {string} path The path to redirect the user
     * @returns {void}
     * @memberof EASDKWrapperService
     */
    redirect(path, forceFallback = false) {
        this.debug('redirect', path);
        if (this.useFallback(forceFallback)) {
            const config = this.config;
            if (!config.shopOrigin || config.shopOrigin.length <= 0) {
                console.error('You need to call the init function first!');
                return;
            }
            const href = config.shopOrigin + '/admin' + path;
            this.debug('redirect in fallbackmode to', href);
            window.location.href = href;
        }
        else {
            return this.shopifyApp.redirect(path);
        }
    }
}
exports.EASDKWrapperService = EASDKWrapperService;
