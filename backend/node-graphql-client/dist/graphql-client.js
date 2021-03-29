"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const fs_1 = require("fs");
const path_1 = require("path");
const findRoot = require("find-root");
const util_1 = require("util");
const _glob = require("glob");
const glob = util_1.promisify(_glob);
class GraphQLClient extends graphql_request_1.GraphQLClient {
    constructor(url, options, root) {
        super(url, options);
        if (!root) {
            root = findRoot(process.cwd());
        }
        this.root = root;
    }
    async searchFiles(filePath) {
        if (!path_1.extname(filePath)) {
            filePath += '.{gql,graphql}';
        }
        const pattern = `${this.root}/**/${filePath}`;
        const files = await glob(pattern, { nodir: true });
        if (files.length <= 0) {
            throw new Error('No file found for pattern ' + pattern);
        }
        return files;
    }
    async searchFile(filePath) {
        const files = await this.searchFiles(filePath);
        if (files.length >= 2) {
            throw new Error('Unclear file path specification, multiple files found: ' +
                files.join(', '));
        }
        return files[0];
    }
    async loadFile(filePath) {
        const file = await this.searchFile(filePath);
        const content = await fs_1.promises.readFile(file, 'utf8');
        return content;
    }
    async loadRequestDocumentCustom(filePath) {
        const content = await this.loadFile(filePath);
        return graphql_request_1.gql `
      ${content}
    `;
    }
    async loadRequestDocument(filePath) {
        const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
        const documents = await load_1.loadDocuments(pattern, {
            loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
        });
        return documents.map((document) => document.rawSDL).join('\n');
    }
    async execute(actionFilePath, variables) {
        const action = await this.loadRequestDocument(actionFilePath);
        const data = await this.request(action, variables);
        return data;
    }
}
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=graphql-client.js.map