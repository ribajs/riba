import { IFormatters, IBinders, IAdapters, IComponents, IOptionsParam, IViewOptions } from './interfaces';
import { parseTemplate, parseType } from './parsers';
import { Binding } from './binding';
import { View } from './view';
import { ModulesService } from './services/module.service';
export declare class Riba {
    /**
     * Sets the attribute on the element. If no binder above is matched it will fall
     * back to using this binder.
     */
    static fallbackBinder: import("./interfaces").IBinder<string>;
    /**
     * Default event handler, calles the function defined in his binder
     * @see Binding.eventHandler
     * @param el The element the event was triggered from
     */
    static handler(this: any, context: any, ev: Event, binding: Binding, el: HTMLElement): void;
    /** singleton instance */
    private static instance;
    module: ModulesService;
    /** Global binders */
    binders: IBinders<any>;
    /** Global components. */
    components: IComponents;
    /** Global formatters. */
    formatters: IFormatters;
    /** Global (sightglass) adapters. */
    adapters: IAdapters;
    parseTemplate: typeof parseTemplate;
    parseType: typeof parseType;
    /** Default template delimiters. */
    templateDelimiters: string[];
    /** Default sightglass root interface. */
    rootInterface: string;
    /** Preload data by default. */
    preloadData: boolean;
    /** Default attribute prefix. */
    private _prefix;
    /** Default attribute full prefix. */
    private _fullPrefix;
    prefix: any;
    readonly fullPrefix: string;
    /**
     * Creates an singleton instance of Riba.
     */
    constructor();
    /**
     * Merges an object literal into the corresponding global options.
     * @param options
     */
    configure(options: any): void;
    getViewOptions(options?: IOptionsParam): IViewOptions;
    /**
     * Binds some data to a template / element. Returns a riba.View instance.
     */
    bind(el: HTMLElement | DocumentFragment | HTMLUnknownElement[], models: any, options?: IOptionsParam): View;
}
