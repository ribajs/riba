import { IDeclarationOptions } from '../interfaces';
export declare class ElementExportDeclarator {
    constructor();
    declare(content: string, options: IDeclarationOptions): string;
    private findExports;
    private findOtherLines;
    private buildLineToInsert;
    private computeRelativePath;
}
