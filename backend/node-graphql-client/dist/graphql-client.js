"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
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
        console.debug('files', files);
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
    async loadRequestDocument(filePath) {
        const content = await this.loadFile(filePath);
        return graphql_request_1.gql `
      ${content}
    `;
    }
    async execute(actionFilePath, variables) {
        const action = await this.loadRequestDocument(actionFilePath);
        const data = await this.request(action, variables);
        return data;
    }
}
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=graphql-client.js.map