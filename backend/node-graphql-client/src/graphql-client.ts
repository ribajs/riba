import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import type { Variables } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';

import { loadDocuments } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import findRoot = require('find-root');

export class GraphQLClient extends _GraphQLClient {
  protected root: string;

  constructor(url: string, options?: RequestInit, root?: string) {
    super(url, options);
    if (!root) {
      root = findRoot(process.cwd());
    }
    this.root = root;
  }

  /**
   * Load GraphQL documents (query/mutation/subscription/fragment)
   * @param filePath
   * @returns
   * @see https://www.graphql-tools.com/docs/documents-loading/
   */
  async loadRequestDocument(filePath: string): Promise<string> {
    const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
    console.debug('loadRequestDocument', pattern);
    const documents = await loadDocuments(pattern, {
      loaders: [new GraphQLFileLoader()],
    });
    return documents.map((document) => document.rawSDL).join('\n');
  }

  /**
   * Execute a server-side GraphQL query within the given context.
   * @param options
   * @param queryFilePath
   */
  async execute<T = any, V = Variables>(
    actionFilePath: string,
    variables?: V,
    requestHeaders?: RequestInit['headers'],
  ) {
    const action = await this.loadRequestDocument(actionFilePath);
    const data = await this.request<T, V>(action, variables, requestHeaders);
    return data;
  }
}
