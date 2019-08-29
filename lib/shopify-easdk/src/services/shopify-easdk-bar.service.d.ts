import { IEASDK, IBarConfig, IBarWrapper, ILoadingStateWrapper, IPaginationConfig, IButtonConfig, IButtonsConfig } from '../interfaces/shopify-easdk';
import { EventDispatcher } from '@ribajs/core';
import { WrapperService } from './wrapper.service';
export declare class BarWrapperService extends WrapperService implements IBarWrapper {
    /**
     * Singleton instace
     */
    static instance?: BarWrapperService;
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
     * Holds the loading status to subscribe for the fallback mode.
     * Inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
     *
     * @type {LoadingStateWrapper>}
     * @memberof BarWrapperService
     */
    loading: ILoadingStateWrapper;
    /**
     * With this BehaviorSubject you can force the visablity of the fallback bar
     *
     * @type {boolean>}
     * @memberof BarWrapperService
     */
    showFallbackBar: boolean;
    protected route: EventDispatcher;
    constructor(shopifyApp?: IEASDK);
    /**
     * Accepts an object that defines how the top bar and buttons will look and behave.
     * This should almost always be called in the ready() method.
     * Default behavior if initialize is never called will result in some pretty safe defaults,
     * except that the loading spinner will never stop spinning.
     */
    initialize(config: IBarConfig): void;
    /**
     * Force the visablity of the fallback bar which is normally only used outside the iframe
     *
     * @param {boolean} [forceFallback] Force the visablity of the fallback bar which is normally only used outside the iframe
     * @memberof BarWrapperService
     */
    setShowFallbackBar(forceFallback: boolean): void;
    /**
     * Restarts the loading bar. It is a best practice to call it when moving between pages or firing off AJAX requests.
     * Fallback mode inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
     * @param {boolean} [forceFallback] Force the fallback mode which is used if you are not in the shopify iframe
     * @param {('determinate' | 'indeterminate' | 'buffer' | 'query')} [mode='determinate'] The progress-bar supports four modes.
     * @param {('primary' | 'accent' | 'warn')} [color] The color of a progress-bar can be changed by using the color property.
     * @returns {void}
     * @memberof BarWrapperService
     */
    loadingOn(forceFallback?: boolean): void;
    /**
     * Stops the loading spinner. Should probably be called on every page in shopifyApp.ready().
     * Fallback mode inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
     */
    loadingOff(): void;
    /**
     * Listen for route events to set the loading spinner automatically.
     * This is a custom method and not part of the officially Shopify EASDK!
     *
     * @param forceFallback
     * @memberof BarWrapperService
     */
    autoLoading(forceFallback?: boolean): void;
    /**
     * Manually set the title string in the top bar. See shopifyApp.Bar.initialize().
     */
    setTitle(title?: string): void;
    /**
     * Automatically set the title on route change, needs the title property in rbia route dataset
     */
    autoTitle(formatter?: (title: string) => Promise<string>): void;
    /**
     * Manually set the icon of the top bar from a URL. See shopifyApp.Bar.initialize().
     * @param icon
     */
    setIcon(icon: string): void;
    /**
     * Automatically set the icon on route change, needs the icon property in rbia route dataset
     */
    autoIcon(forceFallback?: boolean): void;
    /**
     * Manually set the pagination arrows, or pass undefined to remove them entirely. See ShopifyApp.Bar.initialize().
     */
    setPagination(config?: IPaginationConfig): void;
    /**
     * Manually set the breadcrumb in the top bar for an extra level of navigation.
     * Pass a button object, or pass undefined to remove it entirely. See shopifyApp.Bar.initialize().
     * @param config
     * @memberof BarWrapperService
     */
    setBreadcrumb(config?: IButtonConfig): void;
}
