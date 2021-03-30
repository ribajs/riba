"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const findRoot = require("find-root");
class GraphQLClient extends graphql_request_1.GraphQLClient {
    constructor(url, options, root) {
        super(url, options);
        if (!root) {
            root = findRoot(process.cwd());
        }
        this.root = root;
    }
    async loadRequestDocument(filePath) {
        const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
        console.debug('loadRequestDocument', pattern);
        const documents = await load_1.loadDocuments(pattern, {
            loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
        });
        return documents.map((document) => document.rawSDL).join('\n');
    }
    async execute(actionFilePath, variables, requestHeaders) {
        const action = await this.loadRequestDocument(actionFilePath);
        const data = await this.request(action, variables, requestHeaders);
        return data;
    }
}
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=graphql-client.js.map