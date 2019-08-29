import { Path } from '@angular-devkit/core';
export interface IDeclarationOptions {
    flat?: boolean;
    name: string;
    collection: string;
    sourceRoot: string;
    path: Path;
    language: string;
    styleLanguage: string;
    templateEingine: string;
    metadata: string;
    type?: string;
    index: Path;
    symbol?: string;
    staticOptions?: {
        name: string;
        value: Record<string, any>;
    };
}
