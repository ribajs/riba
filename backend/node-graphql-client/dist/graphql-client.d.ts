import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import type { Variables } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';
export declare class GraphQLClient extends _GraphQLClient {
    protected root: string;
    constructor(url: string, options?: RequestInit, root?: string);
    loadRequestDocument(filePath: string): Promise<import("graphql").DocumentNode>;
    execute<T = any, V = Variables>(actionFilePath: string, variables?: V, requestHeaders?: RequestInit['headers']): Promise<T>;
}
