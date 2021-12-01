"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const findRoot = require("app-root-path");
class GraphQLClient extends graphql_request_1.GraphQLClient {
    constructor(url, options, root) {
        super(url, options);
        if (!root) {
            root = findRoot.toString();
        }
        this.root = root;
    }
    async loadRequestDocument(filePath) {
        const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
        const sources = await (0, load_1.loadDocuments)(pattern, {
            loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
        });
        return sources[0].document;
    }
    async execute(actionFilePath, variables, requestHeaders) {
        const action = await this.loadRequestDocument(actionFilePath);
        const data = await this.request(action, variables, requestHeaders);
        return data;
    }
}
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=graphql-client.js.map