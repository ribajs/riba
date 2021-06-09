import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import type { Variables } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import type { DocumentNode } from 'graphql';
export declare class GraphQLClient extends _GraphQLClient {
    protected root: string;
    constructor(url: string, options?: RequestInit, root?: string);
    loadRequestDocument(filePath: string): Promise<DocumentNode>;
    execute<T = any, V = Variables>(actionFilePath: string, variables?: V, requestHeaders?: RequestInit['headers']): Promise<T>;
}
