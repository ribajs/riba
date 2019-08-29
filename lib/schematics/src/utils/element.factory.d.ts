import { Rule } from '@angular-devkit/schematics';
import 'source-map-support/register';
import { IElementOptions } from '../interfaces';
export declare class ElementFactory {
    protected options: IElementOptions;
    protected debug: import("debug").Debugger;
    target: IElementOptions;
    constructor(options: IElementOptions);
    generate(): (context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => import("@angular-devkit/schematics/src/tree/interface").Tree | import("rxjs").Observable<import("@angular-devkit/schematics/src/tree/interface").Tree>;
    addExportToIndex(): Rule;
    protected getTarget(source: IElementOptions): IElementOptions;
    /**
     * Filter template source files, e.g. filter .html files if the template engine is plain html
     */
    protected templateFilesFilter(options: IElementOptions): Rule;
}
