import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import { loadDocuments } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as findRoot from 'app-root-path';
export class GraphQLClient extends _GraphQLClient {
    constructor(url, options, root) {
        super(url, options);
        if (!root) {
            root = findRoot.toString();
        }
        this.root = root;
    }
    async loadRequestDocument(filePath) {
        const pattern = `${this.root}/**/${filePath}.{gql, graphql}`;
        const sources = await loadDocuments(pattern, {
            loaders: [new GraphQLFileLoader()],
        });
        return sources[0].document;
    }
    async execute(actionFilePath, variables, requestHeaders) {
        const action = await this.loadRequestDocument(actionFilePath);
        const data = await this.request(action, variables, requestHeaders);
        return data;
    }
}
//# sourceMappingURL=graphql-client.js.map