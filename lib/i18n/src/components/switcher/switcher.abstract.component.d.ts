import { Component, Debug, IBinder, View } from '@ribajs/core';
import { ILangcode } from '../../interfaces';
import { ALocalesService } from '../../services/locales-base.service';
export interface IScope {
    langcodes: ILangcode[];
    switch: AI18nSwitcherComponent['switch'];
    toggle: AI18nSwitcherComponent['toggle'];
    ready: boolean;
}
export declare abstract class AI18nSwitcherComponent extends Component {
    protected abstract localesService: ALocalesService;
    protected debug: Debug.Debugger;
    protected scope: {
        langcodes: ILangcode[];
        switch: (langcode: ILangcode, context: IBinder<any>, event: Event) => void;
        toggle: (context: IBinder<any>, event: Event) => void;
        ready: boolean;
    };
    constructor(element?: HTMLElement);
    /**
     * Switch to language by langcode
     * @param langcode
     * @param event
     */
    switch(langcode: ILangcode, context: IBinder<any>, event: Event): void;
    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */
    toggle(context: IBinder<any>, event: Event): void;
    protected init(observedAttributes: string[]): Promise<View | null | undefined>;
    protected initLocales(langcode: string): Promise<ILangcode[]>;
    protected setLangcode(langcode: string): void;
    protected beforeBind(): Promise<void>;
    protected afterBind(): Promise<void>;
    protected requiredAttributes(): never[];
    protected disconnectedCallback(): void;
    protected template(): null;
}
