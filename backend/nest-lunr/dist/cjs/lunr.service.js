"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LunrService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunrService = void 0;
const common_1 = require("@nestjs/common");
const lunr = require("lunr");
let LunrService = LunrService_1 = class LunrService {
    constructor() {
        this.builders = {};
        this.indices = {};
        this.data = {};
    }
    getData(ns = 'main', resultRef) {
        const ref = this.getRef(ns);
        const data = this.data[ns]?.find((data) => data[ref] === resultRef);
        return Object.assign({}, data);
    }
    getSortedPositions(metadata) {
        const sortedPositions = [];
        for (const term in metadata) {
            for (const prop in metadata[term]) {
                const positions = metadata[term][prop].position;
                for (let p = positions.length - 1; p >= 0; p--) {
                    const pos = positions[p];
                    if (pos.length === 2) {
                        const start = positions[p][0];
                        const end = start + positions[p][1];
                        sortedPositions.push({
                            start,
                            end,
                            prop,
                            term,
                        });
                    }
                }
            }
        }
        return sortedPositions.sort((a, b) => b.end - a.end);
    }
    insertAt(target, insert, position) {
        return [target.slice(0, position), insert, target.slice(position)].join('');
    }
    highlightResult(result) {
        const metadata = result.matchData.metadata;
        const sortedPositions = this.getSortedPositions(metadata);
        for (const sortPos of sortedPositions) {
            const prop = sortPos.prop;
            const start = sortPos.start;
            const end = sortPos.end;
            if (result.data?.[prop]) {
                let text = result.data[prop];
                if (typeof text === 'string') {
                    text = this.insertAt(text, '</span>', end);
                    text = this.insertAt(text, `<span class='search-highlight'>`, start);
                }
                result.data[prop] = text;
            }
        }
        return result;
    }
    highlightResults(results) {
        return results.map((result) => this.highlightResult(result));
    }
    getRef(ns = 'main') {
        return this.getOptions(ns)?.ref || 'id';
    }
    getOptions(ns = 'main') {
        return this.builders[ns]?.options;
    }
    create(namespace = 'main', options = {}) {
        if (this.builders[namespace]?.builder) {
            return this.builders[namespace].builder;
        }
        options.metadataAllowList = options.metadataAllowList || ['position'];
        options.data = options.data || {};
        LunrService_1.lunr((builder) => {
            if (options.fields) {
                if (typeof options.fields === 'object') {
                    for (const fieldName in options.fields) {
                        if (options.fields.hasOwnProperty(fieldName)) {
                            builder.field(fieldName, options.fields[fieldName]);
                        }
                    }
                }
                if (Array.isArray(options.fields)) {
                    for (const field of options.fields) {
                        builder.field(field);
                    }
                }
            }
            if (options.b) {
                builder.b(options.b);
            }
            if (options.k1) {
                builder.k1(options.k1);
            }
            if (options.ref) {
                builder.ref(options.ref);
            }
            if (options.documentCount) {
                builder.documentCount = options.documentCount;
            }
            if (options.documentLengths) {
                builder.documentLengths = options.documentLengths;
            }
            if (options.documentTermFrequencies) {
                builder.documentTermFrequencies = options.documentTermFrequencies;
            }
            if (options.invertedIndex) {
                builder.invertedIndex = options.invertedIndex;
            }
            if (options.metadataAllowList) {
                builder.metadataWhitelist = options.metadataAllowList;
            }
            if (options.pipeline) {
                builder.pipeline = options.pipeline;
            }
            if (options.searchPipeline) {
                builder.searchPipeline = options.searchPipeline;
            }
            if (options.termIndex) {
                builder.termIndex = options.termIndex;
            }
            if (options.tokenizer) {
                builder.tokenizer = options.tokenizer;
            }
            if (options.plugins && Array.isArray(options.plugins)) {
                for (const plugin of options.plugins) {
                    builder.use(plugin.plugin, ...plugin.args);
                }
            }
            if (!this.builders[namespace]) {
                this.builders[namespace] = {};
            }
            this.builders[namespace].builder = builder;
            this.builders[namespace].options = options;
        });
        return this.builders[namespace]?.builder;
    }
    buildIndex(namespace) {
        if (this.builders[namespace]) {
            this.indices[namespace] = this.builders[namespace]?.builder?.build();
        }
        return this.indices[namespace];
    }
    getBuilder(namespace) {
        return this.builders[namespace]?.builder;
    }
    getIndex(namespace) {
        if (!this.indices[namespace]) {
            return this.buildIndex(namespace);
        }
        return this.indices[namespace];
    }
    getNamespaces() {
        return Object.keys(this.indices);
    }
    add(ns, doc, attributes) {
        const builder = this.getBuilder(ns);
        if (!builder) {
            return null;
        }
        const options = this.getOptions(ns);
        if (options.data?.include) {
            this.data[ns] = this.data[ns] || [];
            this.data[ns].push(doc);
        }
        return builder.add(doc, attributes);
    }
    delete(ns) {
        this.builders[ns] = {};
        this.data[ns] = [];
    }
    reset(ns) {
        const options = this.getOptions(ns);
        this.delete(ns);
        this.create(ns, options);
    }
    build(ns) {
        const builder = this.getBuilder(ns);
        if (!builder) {
            return null;
        }
        return builder.build();
    }
    use(ns, plugin, ...args) {
        const builder = this.getBuilder(ns);
        if (!builder) {
            return null;
        }
        return builder.use(plugin, ...args);
    }
    search(ns, query) {
        const index = this.getIndex(ns);
        if (!index) {
            return null;
        }
        const options = this.getOptions(ns);
        const resultsExt = [];
        const results = index.search(query);
        if (!results) {
            return null;
        }
        for (const result of results) {
            const resultExt = {
                ...result,
                ns,
            };
            if (options.data?.include) {
                resultExt.data = this.getData(ns, result.ref);
            }
            resultsExt.push(resultExt);
        }
        if (options.data?.include && options.data?.highlight) {
            this.highlightResults(resultsExt);
        }
        resultsExt.sort((a, b) => {
            return b.score - a.score;
        });
        return resultsExt;
    }
    searchAll(query) {
        const searchResults = [];
        const namespaces = this.getNamespaces();
        for (const ns of namespaces) {
            const results = this.search(ns, query);
            if (results) {
                searchResults.push(...results);
            }
        }
        searchResults.sort((a, b) => {
            return b.score - a.score;
        });
        return searchResults;
    }
};
LunrService.lunr = lunr;
LunrService = LunrService_1 = __decorate([
    (0, common_1.Injectable)()
], LunrService);
exports.LunrService = LunrService;
//# sourceMappingURL=lunr.service.js.map