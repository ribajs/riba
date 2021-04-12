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
    reset(ns) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.reset();
    }
    load(ns, corpus, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.load(corpus, opts);
    }
    addWord(ns, word, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.addWord(word, opts);
    }
    removeWord(ns, word, opts) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.removeWord(word, opts);
    }
    suggest(ns, word, alphabet) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.suggest(word, alphabet);
    }
    lucky(ns, word, alphabet) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.lucky(word, alphabet);
    }
    export(ns) {
        const suggest = this.get(ns);
        if (!suggest) {
            return null;
        }
        return suggest.export();
    }
};
SuggestService = __decorate([
    common_1.Injectable()
], SuggestService);
exports.SuggestService = SuggestService;
//# sourceMappingURL=suggest.service.js.map