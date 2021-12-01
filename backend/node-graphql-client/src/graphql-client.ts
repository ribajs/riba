import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import type { Variables } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import type { DocumentNode } from 'graphql';

import { loadDocuments } from '@graphql-tools/load';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import * as findRoot from 'app-root-path';

export class GraphQLClient extends _GraphQLClient {
  protected root: string;

  constructor(url: string, options?: RequestInit, root?: string) {
    super(url, options);
    if (!root) {
      root = findRoot.toString();
    }
    this.root = root;
  }

  /**
   * Load GraphQL documents (query/mutation/subscription/fragment)
   * @param filePath
   * @returns
   * @see https://www.graphql-tools.com/docs/documents-loading/
   */
  async loadRequestDocument(filePath: string): Promise<DocumentNode> {
    const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
    const sources = await loadDocuments(pattern, {
      loaders: [new GraphQLFileLoader()],
    });
    return sources[0].document;
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
  ): Promise<T> {
    const action = await this.loadRequestDocument(actionFilePath);
    const data = await this.request<T, V>(action, variables, requestHeaders);
    return data;
  }
}
