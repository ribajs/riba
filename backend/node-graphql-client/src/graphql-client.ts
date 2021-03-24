import { GraphQLClient as _GraphQLClient, gql } from 'graphql-request';
import type { Variables, RequestDocument } from 'graphql-request/dist/types';
import type { RequestInit } from 'graphql-request/dist/types.dom';

import { promises as fs } from 'fs';
import { extname } from 'path';
import findRoot = require('find-root');
import { promisify } from 'util';
import * as _glob from 'glob';

const glob = promisify(_glob);

export class GraphQLClient extends _GraphQLClient {
  protected root: string;

  constructor(url: string, options?: RequestInit, root?: string) {
    super(url, options);
    if (!root) {
      root = findRoot(process.cwd());
    }
    this.root = root;
  }

  protected async searchFiles(filePath: string) {
    if (!extname(filePath)) {
      filePath += '.{gql,graphql}';
    }
    const pattern = `${this.root}/**/${filePath}`;
    const files = await glob(pattern, { nodir: true });
    console.debug('files', files);
    if (files.length <= 0) {
      throw new Error('No file found for pattern ' + pattern);
    }
    return files;
  }

  protected async searchFile(filePath: string) {
    const files = await this.searchFiles(filePath);

    if (files.length >= 2) {
      throw new Error(
        'Unclear file path specification, multiple files found: ' +
          files.join(', '),
      );
    }

    return files[0];
  }

  protected async loadFile(filePath: string) {
    const file = await this.searchFile(filePath);
    const content = await fs.readFile(file, 'utf8');
    return content;
  }

  /**
   * Load GraphQL documents (query/mutation/subscription/fragment)
   * @param filePath
   * @returns
   * @see https://www.graphql-tools.com/docs/documents-loading/
   */
  async loadRequestDocument(filePath: string): Promise<RequestDocument> {
    // const pattern = `${this.root}/**/${filePath}`;
    const content = await this.loadFile(filePath);
    return gql`
      ${content}
    `;
  }

  /**
   * Execute a server-side GraphQL query within the given context.
   * @param options
   * @param queryFilePath
   */
  async execute(actionFilePath: string, variables?: Variables) {
    const action = await this.loadRequestDocument(actionFilePath);
    const data = await this.request(action, variables);
    return data;
  }
}
