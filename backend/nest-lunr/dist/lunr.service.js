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
    }
    create(namespace = 'main', options = {}) {
        if (this.builders[namespace]) {
            return this.builders[namespace];
        }
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
            if (options.metadataWhitelist) {
                builder.metadataWhitelist = options.metadataWhitelist;
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
            this.builders[namespace] = builder;
            return this.builders[namespace];
        });
        return this.builders[namespace];
    }
    buildIndex(namespace) {
        var _a;
        if (this.builders[namespace]) {
            this.indices[namespace] = (_a = this.builders[namespace]) === null || _a === void 0 ? void 0 : _a.build();
        }
        return this.indices[namespace];
    }
    getBuilder(namespace) {
        return this.builders[namespace];
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
    search(ns, query) {
        const index = this.getIndex(ns);
        if (!index) {
            return null;
        }
        const results = index.search(query);
        if (!results) {
            return null;
        }
        for (const result of results) {
            result.ns = ns;
        }
        return results;
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
        return searchResults;
    }
};
LunrService.lunr = lunr;
LunrService = LunrService_1 = __decorate([
    common_1.Injectable()
], LunrService);
exports.LunrService = LunrService;
//# sourceMappingURL=lunr.service.js.map