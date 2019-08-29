import { IDeclarationOptions } from '../interfaces';
export declare class MetadataManager {
    private content;
    constructor(content: string);
    insert(metadata: string, symbol: string, staticOptions?: IDeclarationOptions['staticOptions']): string;
    private getDecoratorMetadata;
    private getSourceNodes;
    private insertMetadataToEmptyModuleDecorator;
    private insertNewMetadataToDecorator;
    private insertSymbolToMetadata;
    private mergeSymbolAndExpr;
    private addBlankLines;
}
