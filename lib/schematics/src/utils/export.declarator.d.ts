import { IDeclarationOptions } from '../interfaces/declarations-options';
import { ElementExportDeclarator } from './element-export.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';
export declare class ExportDeclarator {
    private exports;
    private metadata;
    constructor(exports?: ElementExportDeclarator, metadata?: ModuleMetadataDeclarator);
    declare(content: string, options: IDeclarationOptions): string;
    private computeSymbol;
}
