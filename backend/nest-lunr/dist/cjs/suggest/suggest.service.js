"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestService = void 0;
const common_1 = require("@nestjs/common");
const suggest_1 = require("./suggest");
let SuggestService = class SuggestService {
    constructor() {
        this.suggests = {};
    }
    create(ns, storage) {
        if (this.suggests.hasOwnProperty(ns)) {
            return this.suggests[ns];
        }
        this.suggests[ns] = new suggest_1.Suggest(storage);
        return this.suggests[ns];
    }
    get(ns) {
        return this.suggests[ns] || null;
    }
    getNamespaces() {
        return Object.keys(this.suggests);
    }
    ignore(ns, ignoreWords) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.ignore(ignoreWords);
    }
    reset(ns) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.reset();
    }
    resetAll() {
        const namespaces = this.getNamespaces();
        for (const ns of namespaces) {
            this.reset(ns);
        }
    }
    load(ns, corpus, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.load(corpus, opts);
    }
    addWord(ns, word, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.addWord(word, opts);
    }
    removeWord(ns, word, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.removeWord(word, opts);
    }
    suggest(ns, word, alphabet) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.suggest(word, alphabet);
    }
    suggestAll(word, alphabet) {
        const namespaces = this.getNamespaces();
        const allResults = [];
        for (const ns of namespaces) {
            const results = this.suggest(ns, word, alphabet);
            if (results) {
                for (const result of results) {
                    const exists = allResults.find((allResult) => allResult.word === result.word);
                    if (exists) {
                        exists.ns.push(ns);
                        exists.score += result.score;
                    }
                    else {
                        allResults.push(Object.assign(Object.assign({}, result), { ns: [ns] }));
                    }
                }
            }
        }
        allResults.sort((a, b) => {
            return b.score - a.score;
        });
        return allResults;
    }
    lucky(ns, word, alphabet) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.lucky(word, alphabet);
    }
    luckyAll(word, alphabet) {
        var _a;
        const suggestions = this.suggestAll(word, alphabet);
        return (_a = suggestions[0]) === null || _a === void 0 ? void 0 : _a.word;
    }
    export(ns) {
        const suggest = this.get(ns);
        if (!suggest) {
            throw new Error(`Namespace "${ns}" not found!`);
        }
        return suggest.export();
    }
};
SuggestService = __decorate([
    (0, common_1.Injectable)()
], SuggestService);
exports.SuggestService = SuggestService;
//# sourceMappingURL=suggest.service.js.map