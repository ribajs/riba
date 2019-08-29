import { Debug } from '@ribajs/core';
import { ALocalesService } from './locales-base.service';
export declare class LocalesStaticService extends ALocalesService {
    protected locales: any;
    protected id?: string | undefined;
    static instances: {
        [id: string]: LocalesStaticService;
    };
    static getInstance(id?: string): LocalesStaticService;
    /**
     * The current setted langcode
     */
    protected currentLangcode?: string;
    /**
     * The default theme langcode before any language was choosed
     */
    protected initalLangcode?: string;
    protected debug: Debug.Debugger;
    constructor(locales: any, id?: string | undefined, doNotTranslateDefaultLanguage?: boolean);
    /**
     * Get file with all languages
     * @param themeID
     */
    protected getAll(themeID?: number): Promise<any>;
}
