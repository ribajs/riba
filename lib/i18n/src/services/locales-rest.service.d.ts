import { Debug } from '@ribajs/core';
import { ALocalesService } from './locales-base.service';
/**
 * LocalesRestService get locales object from url
 */
export declare class LocalesRestService extends ALocalesService {
    protected url: string;
    static instances: {
        [url: string]: LocalesRestService;
    };
    static getInstance(url: string): LocalesRestService;
    locales: any;
    /**
     * The current setted langcode
     */
    protected currentLangcode?: string;
    /**
     * The default theme langcode before any language was choosed
     */
    protected initalLangcode?: string;
    protected debug: Debug.Debugger;
    constructor(url: string, doNotTranslateDefaultLanguage?: boolean);
    /**
     * Get file with all languages
     * @param themeID
     */
    protected getAll(url?: string): Promise<any>;
}
