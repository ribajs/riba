import { WrapperService } from '../services';

/**
 * type definitions for Shopify's Embedded App SDK
 * @see https://help.shopify.com/api/sdks/embedded-app-sdk
 */
export const ShopifyApp: IEASDK = (window as any).ShopifyApp;

export interface IConfig {
    /**
     * ff9b1d04414785029e066f8fd0465d00 or similar.
     * The API key provided to you for your application in the Shopify Partners area.*
     */
    apiKey: string;
    /**
     * The origin of the Shopify shop.
     * This will come out of the session values returned from the Shopify API
     * and should be set dynamically for each different merchant/shop.
     * It'll be something like "https://example.myshopify.com" and should always include the protocol.
     */
    shopOrigin: string;
    /**
     * 	Defaults to true. Can be used to disable redirection into the admin for debugging or testing purposes.
     */
    forceRedirect?: boolean;
    /**
     * 	Defaults to false. Will activate some console.log logging output.
     */
    debug?: boolean;
}

export type ButtonCallback = (message: string, data: any) => void;

/**
 * Button objects are used to define buttons on the top bar and in modal windows.
 * A button object has a required label field for the button text.
 * It has optional fields for message which is the postMessage the admin will send when the button is clicked.
 * It also accepts an callback function that is called on click.
 * Alternately it accepts a href attribute which will make the button open the provided link in a new window.
 * The use case for the link is something like "Open preview in a new window".
 */
export interface IButtonConfig {
    /**
     * The text displayed in the button.
     */
    label?: string;
    /**
     * The value of the post message that Shopify will send down to the application that can then be listened for.
     * Attributes such as callback and href create these messages manually and do not require this to be set.
     */
    message?: string;
    /**
     * When the button is clicked, this function will be executed in the app. Params are (message, data).
     */
    callback?: ButtonCallback;
    /**
     * The URL to be opened.
     * It should be absolute for app links or external links.
     * For links within Shopify it should be of the format /orders/123.
     * The specific location where this link will be opened depends on the target attribute.
     */
    href?: string;
    /**
     * The location where the value of the href will be opened. Default is app.
     * The acceptable values are:
     *  new - Open a new window/tab.
     *  parent - Replace the current frame/window.
     *  shopify - A redirect to within the Shopify admin. A relative path without the admin prefix, like /products.
     *  app - Redirects the app's iframe to this URL. Essentially clicking a regular navigation link in the app.
     */
    target?: 'new'|'parent'|'shopify'|'app';
    /**
     * A boolean value stating if the loading spinner should activate when this button is pressed.
     * Shopify attempts to make a rational guess as to if this should be true or false depending on the action (ie: target:
     * 'new' defaults to false, but target: 'app' defaults to true).
     * It is always safe and prudent to override this value to be exactly what you require for your specific application.
     */
    loading?: boolean;
    /**
     * Optional color styling for the button. It will always be a sane default,
     * but can accept danger and disabled. If this is not set,
     * primary buttons appear blue and secondary and tertiary buttons are white.
     */
    style?: 'danger' | 'disabled' | undefined;
    /**
     * Sets the button to become a dropdown button.
     * Should be used alongside the links attribute.
     * Current accepted value is dropdown.
     * Only valid for secondary top bar buttons.
     */
    type?: string;
    /**
     * A list of buttons. Accepts the same attributes as a regular button, like label, target and callback.
     * Only valid for secondary top bar buttons.
     */
    links?: Array<IButtonConfig>;

    /**
     * Custom object to save custom properties ignored from shopify's easdk
     *
     * @type {*}
     * @memberof IButtonConfig
     */
    custom?: any;
}

export interface IButtonsConfig {
    primary?: IButtonConfig;
    secondary?: IButtonConfig;
}

export interface IReceiveMessage {
    message: string;
    data: any;
}

// export interface IButtonWrapperReturn {
//     onClick?: () => Promise<IReceiveMessage>
// }

/**
 * The configuration for pagination is a simplified version of button objects.
 * When the pagination: key contains anything that is not falsy, the buttons will appear but will be inactive.
 * The pagination: key expects an object containing two objects as previous: and next:, each describing a button.
 * The button definition objects look like this:
 */
export interface IPaginationConfig {
    next: IButtonConfig;
    previous: IButtonConfig;
}
export interface IBarConfig {
    /**
     * An object describing the buttons displayed in the top bar.
     * The object contains two keys, primary and secondary, and each of those keys contain an array of button objects.
     * Primary buttons default to blue, and have a maximum of one button.
     * Secondary buttons have a maximum of four buttons.
     */
    buttons?: IButtonsConfig;
    /**
     * The title string displayed in the header behind the application's name.
     */
    title?: string;
    /**
     * A URL to an image file used as the icon in the top bar. If omitted, a default app icon will be used.
     */
    icon?: string;
    /**
     * An object configuring and toggling the pagination arrow button group.
     */
    pagination?: IPaginationConfig;
    /**
     * A button object configuring and toggling the breadcrumb in the top bar.
     */
    breadcrumb?: IButtonConfig;
}

/**
 * Interface for the loading status to subscribe for the fallback mode.
 * Inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
 *
 * @export
 * @interface ILoadingStateWrapper
 */
export interface ILoadingStateWrapper {
    /**
     * If true show the loader
     */
    on: boolean;
}

export interface IBar {
    /**
     * Accepts an object that defines how the top bar and buttons will look and behave.
     * This should almost always be called in the ready() method.
     * Default behavior if initialize is never called will result in some pretty safe defaults,
     * except that the loading spinner will never stop spinning.
     */
    initialize(config: IBarConfig): void;
    /**
     * Restarts the loading bar. It is a best practice to call it when moving between pages or firing off AJAX requests.
     */
    loadingOn(): void;
    /**
     * Stops the loading spinner. Should probably be called on every page in `ShopifyApp.ready()`.
     */
    loadingOff(): void;
    /**
     * Manually set the title string in the top bar. See ShopifyApp.IBar.initialize().
     */
    setTitle(title?: string): void;
    /**
     * Manually set the icon of the top bar from a URL. See ShopifyApp.IBar.initialize().
     */
    setIcon(icon: string): void;
    /**
     * Manually set the icon of the top bar from a URL. See ShopifyApp.IBar.initialize().
     */
    setPagination(config?: IPaginationConfig): void;
    /**
     * Manually set the breadcrumb in the top bar for an extra level of navigation.
     * Pass a button object, or pass undefined to remove it entirely. See ShopifyApp.IBar.initialize().
     */
    setBreadcrumb(config?: IButtonConfig): void;
}

export interface IBarWrapper extends IBar, WrapperService, IBarConfig {
    /**
     * Holds the setted buttons (setted by initialize IBarWrapper['method']) to access for the fallback mode
     */
    buttons?: IButtonsConfig;

    /**
     * Holds the setted breadcrumbs config to access for the fallback mode
     */
    breadcrumb?: IButtonConfig;

    /**
     * Holds the setted title string to access for the fallback mode
     */
    title?: string;

    /**
     * Holds the icon url to access for the fallback mode.
     */
    icon?: string;

    /**
     *  Holds the pagination config to access for the fallback mode.
     */
    pagination?: IPaginationConfig;

    /**
     * Holds the loading status to access for the fallback mode.
     * Inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
     */
    loading: ILoadingStateWrapper;

    /**
     * With this BehaviorSubject you can force the visablity of the fallback bar
     */
    showFallbackBar: boolean;

    /**
     * Force the visablity of the fallback bar which is normally only used outside the iframe
     *
     * @param forceFallback Force the visablity of the fallback bar which is normally only used outside the iframe
     */
    setShowFallbackBar(forceFallback: boolean): void;

    /**
     * Listen for route events to set the loading spinner automatically.
     * This is a custom method and not part of the officially Shopify EASDK!
     * @see https://stackoverflow.com/a/38620817/1465919
     */
    autoLoading(forceFallback?: boolean): void;

    /**
     * @param config Manually set the breadcrumb in the top bar for an extra level of navigation.
     * Pass a button object, or pass undefined to remove it entirely.
     * See ShopifyApp.Bar.initialize().
     * Can be applied only if a title has been set with ShopifyApp.Bar.setTitle().
     */
    setBreadcrumb(config?: IButtonConfig): void;
}

/**
 * An object describing the buttons displayed at the bottom of the modal. The object contains three keys, primary, secondary, and tertiary.
 * Each of those keys contain an array of button objects.
 *
 * @export
 * @interface IButtonsIModalConfig
 */
export interface IButtonsIModalConfig {
    /**
     * Primary buttons default to blue, are floated right, and have a maximum of one button.
     */
    primary?: [IButtonConfig];

    /**
     * Secondary buttons are floated right and have a maximum of two buttons.
     */
    secondary?: [IButtonConfig];

    /**
     * Tertiary buttons are floated left and have a maximum of two buttons.
     */
    tertiary?: [IButtonConfig];
}

export interface IModalInit {
    /**
     * The URL to be opened in the iframe.
     */
    src: string;

    /**
     * The title of the modal.
     */
    title: string;

    /**
     * Defaults to `small`. This allows you to set a predetermined width for the modal. The acceptable values are:
     * `large` - 980px wide
     * `fullwidth` - Fills the width of the screen.
     */
    width?: 'small' | 'large' | 'fullwidth';

    /**
     * This determines the height of the modal in pixels up to a maximum height of 700px and a minimum of 100px.
     * The height is applied to the body (excluding the header and footer) of the rendered modal.
     * This can also be set from within the modal using the `ShopifyApp.IModal.setHeight()` method.
     */
    height?: number;

    /**
     * An object describing the buttons displayed at the bottom of the modal.
     * The object contains three keys, `primary`, `secondary`, and `tertiary`.
     * Each of those keys contain an array of button objects.
     * Primary buttons default to blue, are floated right, and have a maximum of one button.
     * Secondary buttons are floated right and have a maximum of two buttons.
     * Tertiary buttons are floated left and have a maximum of two buttons.
     */
    buttons?: IButtonsIModalConfig;

    /**
     * When the modal is closed, this function will be executed in the app. Params are `(result, data)`.
     *
     * @param {any} result
     * @param {any} data
     * @memberof IModalInit
     */
    callback?(result: boolean, data: any): void;
}

/**
 * The options parameter can be a message to be displayed in the alert window,
 * or it can be an object containing a message, a title for the modal, and a button label.
 *
 * @export
 * @interface IModalAlertOptions
 */
export interface IModalAlertOptions {
    title: string;
    message: string;
    okButton: string;

    /**
     * All modal dialogs can also accept a style:
     * 'danger' attribute which will change the primary button from blue to red,
     * useful for delete confirmations.
     */
    style?: 'danger' | 'disabled' | undefined;
}

/**
 * The options parameter can be a message to be displayed in the confirm window,
 * or it can be an object containing a message, a title for the modal,
 * and labels for the 'OK' and 'Cancel' buttons.
 *
 * @export
 * @interface IModalConfirmOptions
 */
export interface IModalConfirmOptions {
    title?: string;
    message?: string;
    okButton?: string;
    cancelButton?: string;

    /**
     * All modal dialogs can also accept a style:
     * 'danger' attribute which will change the primary button from blue to red,
     * useful for delete confirmations.
     */
    style?: 'danger' | 'disabled' | undefined;
}

/**
 * The options parameter can be a message to be displayed in the input window,
 * or it can be an object containing a message, a title for the modal,
 * and labels for the 'OK' and 'Cancel' buttons.
 * See the description for confirm() for an example.
 *
 * @export
 * @interface IModalInputOptions
 */
export interface IModalInputOptions {
    title?: string;
    message?: string;
    okButton?: string;
    cancelButton?: string;

    /**
     * All modal dialogs can also accept a style:
     * 'danger' attribute which will change the primary button from blue to red,
     * useful for delete confirmations.
     */
    style?: 'danger' | 'disabled' | undefined;
}

export interface IProductPickerOptions {
    /**
     * Determines if the user can select multiple products or collections.
     */
    selectMultiple: boolean;

    /**
     * Selects if only published products are shown, or if true allows hidden (unpublished) resources to be selected.
     * Defaults to true.
     */
    showHidden?: boolean;
}

export type ProductPickerCallback = (
    /**
     * Will be true if any products are selected.
     */
    success: boolean,

    data: {
        /**
         * Will contain an array of product objects (JSON), if any.
         */
        products: [any],

        /**
         * Will contain an array of errors (string), if any.
         */
        errors: [string],
    },
) => void;

export interface IUserData {

    /**
     * Can have 3 possible values: Account owner, Full access or Limited access.
     * It will depend on the account access level of the current logged-in user.
     */
    accountAccess: 'Account owner' | 'Full access' | 'Limited access';
}

export interface IUser {

    /**
     * Returns an object representing the current user logged in to the admin.
     * It is available anytime after the Shopify.ready call.
     * Currently it only returns the accountAccess of the user.
     */
    current: IUserData | undefined;
}

export interface IModal {

    /**
     * Opens a modal dialog in the Shopify admin that in turn loads an iframe inside of it with the passed in URL.
     * It accepts a src attribute to be loaded, a title for the top of the bar,
     * and a configuration of primary and secondary buttons identical to IBar.initialize().
     * It also accepts a callback function that is called when the modal is closed.
     *
     * To learn how to communicate from the modal iframe to the app iframe, read IModal & App Communication.
     *
     * @see https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/features#modal-and-application-communication
     * @param init
     * @param fn
     */
    open(init: IModalInit, fn?: (result: boolean, data: any) => void, forceFallback?: boolean): void;

    /**
     * Opens a Javascript style alert() in the admin.
     * When the modal is closed the optional callback is called and a modal close message is sent.
     *
     * @param options
     * @param fn
     */
    alert(options: IModalAlertOptions, fn?: (result: boolean) => void): void;

    /**
     * Opens a Javascript style confirm() in the admin.
     * When the modal is closed the optional callback is called and a modal close message is sent.
     * The callback has the status of the closure passed in.
     *
     * @param options
     * @param fn
     */
    confirm(options: IModalConfirmOptions, fn: (result: boolean) => void): void;

    /**
     * Opens a Javascript style input() dialog in the admin.
     * When the modal is closed the optional callback is called and a modal close message is sent.
     * The callback has the status of the closure and the contents of the input box passed in.
     *
     * @param options
     * @param fn
     */
    input(options: IModalInputOptions, fn: (result: boolean, data: any) => void): void;

    /**
     * Closes the currently open modal window and manually sets the result and data payload.
     * Result expects a true or false and data can contain the message payload, or nothing.
     *
     * @param result
     * @param data
     */
    close(result: boolean, data: string): void;

    /**
     * Sets the height of the currently open modal window up to a maximum height of 700px and a minimum of 100px.
     * The height is applied to the body (excluding the header and footer) of the rendered modal.
     *
     * @param height
     */
    setHeight(height: number): void;

    /**
     * Opens a modal dialog containing a list of the products or collections available in the store,
     * with a search field for filtering results.
     * The modal can be used for selecting one or more products/collections, using the resource picker's options.
     *
     * The callback passed into the resource picker is invoked when the dialog is closed or a button is pressed.
     * The callback is passed a success flag (boolean) which will be true if products are selected.
     * The second parameter is a data object (JSON) which contains the selected products (if any)
     * and any errors that may have surfaced.
     *
     * @param options
     * @param fn
     */
    productPicker(options: IProductPickerOptions, fn: ProductPickerCallback): void;

    /**
     * The collection picker has the same interface as the product picker.
     *
     * @param options
     * @param fn
     */
    collectionPicker(options: IProductPickerOptions, fn: ProductPickerCallback): void;
}

export interface IModalWrapper extends IModal {
    open(init: IModalInit, fn: (result: boolean, data: any) => void, forceFallback?: boolean): void;
    alert(options: IModalAlertOptions, fn?: (result: boolean) => void, forceFallback?: boolean): void;
    confirm(options: IModalConfirmOptions, fn: (result: boolean) => void, forceFallback?: boolean): void;
    input(options: IModalInputOptions, fn: (result: boolean, data: any) => void, forceFallback?: boolean): void;
}

export interface IEASDK {

    Bar: IBar;

    Modal: IModal;

    User: IUser;

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
     * ShopifyApp.ready(function(){
     *   alert("Ready");
     * });
     * ```
     */
    ready(cb: () => void): void;
    /**
     * Used to rewrite the current URL. This is called automatically and probably doesn't need to be explicitly called at all.
     */
    pushState(path: string): void;
    /**
     * Displays a message in the Shopify admin chrome styled as a notice. Use only for successful or neutral messages.
     *
     * `ShopifyApp.flashNotice("Unicorn was created successfully.");`
     */
    flashNotice(message: string): void;
    /**
     * Displays a message in the Shopify admin chrome styled as an error. Use only for errors or failures.
     *
     * `ShopifyApp.flashError("Unicorn could not be created.");`
     */
    flashError(message: string): void;
    /**
     * Dispatches away from the app and into another section in the Shopify admin.
     * The path should be prefixed with a slash, but should not include the /admin part.
     * Example: /customers/120999015 or  /settings/domains.
     *
     * `ShopifyApp.redirect("/orders");`
     */
    redirect(path: string): void;
}

export interface IEASDKWrapper extends IEASDK {
    flashNotice(message: string, forceFallback?: boolean, action?: string, onAction?: () => Promise<void>): void;
    flashError(message: string, forceFallback?: boolean, action?: string, onAction?: () => Promise<void>): void;
}
