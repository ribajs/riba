import { EventDispatcher } from '@ribajs/core';
import { IEASDK, IEASDKWrapper, IConfig, IReceiveMessage } from '../interfaces/shopify-easdk';
import { WrapperService } from './wrapper.service';
import { BarWrapperService } from './shopify-easdk-bar.service';
import { ModalWrapperService } from './shopify-easdk-modal.service';
import { UserWrapperService } from './shopify-easdk-user.service';
export declare class EASDKWrapperService extends WrapperService implements IEASDKWrapper {
    static instance?: EASDKWrapperService;
    event: EventDispatcher;
    protected config: IConfig;
    protected message?: IReceiveMessage;
    Bar: BarWrapperService;
    Modal: ModalWrapperService;
    User: UserWrapperService;
    constructor(shopifyApp?: IEASDK);
    /**
     * Receive EASDK messages and listen for them
     * Subscribe `message$' to get the messages!
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
     */
    protected listenForMessage(): void;
    /**
     * Should be called immediately after the script file has loaded,
     * as early as possible on the page (not in a jQuery.ready() or something).
     * It will initialize data values, add postMessage listeners,
     * check that the app is embedded in an iframe, and setup our initializers.
     */
    init(config: IConfig): void;
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
    ready(cb: () => void): void;
    /**
     * Used to rewrite the current URL. This is called automatically and probably doesn't need to be explicitly called at all.
     *
     * @param {string} path The path to rewrite in the current URL outsite of the iframe
     * @returns {void}
     * @memberof EASDKWrapperService
     */
    pushState(path: string): void;
    /**
     * Displays a message in the Shopify admin chrome styled as a notice. Use only for successful or neutral messages.
     * `shopifyApp.flashNotice("Unicorn was created successfully.");`
     *
     * @param message The message to show
     * @param forceFallback Force the fallback mode which is used if you are not in the shopify iframe
     * @memberof EASDKWrapperService
     */
    flashNotice(message: string, forceFallback?: boolean): void;
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
    flashError(message: string, forceFallback?: boolean): void;
    /**
     * Dispatches away from the app and into another section in the Shopify admin.
     * The path should be prefixed with a slash, but should not include the /admin part.
     * Example: /customers/120999015 or /settings/domains.
     *
     * @param {string} path The path to redirect the user
     * @returns {void}
     * @memberof EASDKWrapperService
     */
    redirect(path: string, forceFallback?: boolean): void;
}
