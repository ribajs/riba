import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import type { Variables, RequestDocument } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';
export declare class GraphQLClient extends _GraphQLClient {
    protected root: string;
    constructor(url: string, options?: RequestInit, root?: string);
    protected searchFiles(filePath: string): Promise<string[]>;
    protected searchFile(filePath: string): Promise<string>;
    protected loadFile(filePath: string): Promise<string>;
    loadRequestDocument(filePath: string): Promise<RequestDocument>;
    execute(actionFilePath: string, variables?: Variables): Promise<any>;
}
