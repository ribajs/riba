/// <reference types="jquery" />
import { EventDispatcher, Debug } from '@ribajs/core';
import { ILangcode, ILocalPluralization, ILocalVar } from '../interfaces';
export declare abstract class ALocalesService {
    doNotTranslateDefaultLanguage: boolean;
    readonly ready: boolean;
    event: EventDispatcher;
    protected _ready: boolean;
    protected debug: Debug.Debugger;
    /**
     * The current setted langcode
     */
    protected abstract currentLangcode?: string;
    /**
     * The default theme langcode before any language was choosed
     */
    protected abstract initalLangcode?: string;
    constructor(doNotTranslateDefaultLanguage: boolean);
    /**
     * Get translation by properties, e.g. `de.form.newsletter_label`
     * Properties object must include the language code, e.g. `de`.
     * @param properties properties, e.g. `['de', 'form', 'newsletter', 'label']`
     * @param force Set this to true if you want to force the request also if the service is not ready, you should use this only one the time
     */
    get(properties?: string[], vars?: ILocalVar, force?: boolean): Promise<any>;
    /**
     * Get translation by properties, e.g. `form.newsletter_label`
     * Properties object must not include the language code.
     * @param properties properties, e.g. `[form', 'newsletter', 'label']`
     */
    getByCurrentLang(properties?: string[], vars?: ILocalVar): Promise<any>;
    getBrowserLangcode(): any;
    getHTMLLangcode(): string;
    /**
     * Get the current langcode,
     * if lang was not choosed this is the langcode of the lang attribute of the html element.
     * If the language was changed this returns the changed language
     */
    getLangcode(): string | undefined;
    getInitialLangcode(): string | undefined;
    setLangcode(langcode: string, initial?: boolean): void;
    getAvailableLangcodes(): Promise<ILangcode[]>;
    /**
     * Parse templates wich can be used to set variables on language strings
     */
    parseTemplateVars($el: JQuery<HTMLElement>): ILocalVar;
    /**
     * Parse templates wich have his own translations
     */
    parseLocalVars($el: JQuery<HTMLElement>): ILocalVar;
    /**
     * Replace variables on translated string
     * @param translateString
     * @param vars
     */
    setTranslateStringVars(translateString: string, vars: ILocalVar): string;
    /**
     * Get file with all languages
     */
    protected abstract getAll(): Promise<any>;
    protected init(): Promise<any>;
    /**
     * see https://help.shopify.com/en/themes/development/theme-store-requirements/internationalizing/translation-filter#pluralization-in-translation-keys
     * @param translateString
     * @param vars
     */
    protected setTranslateStringPluralization(translateObj: ILocalPluralization | string, vars: ILocalVar): string;
}
