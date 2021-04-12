"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggest = void 0;
class Suggest {
    constructor(dictStore) {
        this.dict = {};
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        if (dictStore) {
            this.dictStore = dictStore;
            if (typeof dictStore.get === 'function') {
                this.dict = dictStore.get();
            }
        }
    }
    noop() {
    }
    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    store(cb) {
        if (this.dictStore && typeof this.dictStore.store === 'function') {
            this.dictStore.store(this.dict, cb);
        }
    }
    train(corpus, regex) {
        let match;
        let word;
        regex = regex || /[a-z]+/g;
        corpus = corpus.toLowerCase();
        while ((match = regex.exec(corpus))) {
            word = match[0];
            this.addWord(word, { score: 1 });
        }
    }
    edits(word, alphabetOverride) {
        const edits = [];
        const thisAlphabet = alphabetOverride ? alphabetOverride : this.alphabet;
        let i;
        let j;
        for (i = 0; i < word.length; i++) {
            edits.push(word.slice(0, i) + word.slice(i + 1));
        }
        for (i = 0; i < word.length - 1; i++) {
            edits.push(word.slice(0, i) +
                word.slice(i + 1, i + 2) +
                word.slice(i, i + 1) +
                word.slice(i + 2));
        }
        for (i = 0; i < word.length; i++) {
            for (j in thisAlphabet) {
                edits.push(word.slice(0, i) + thisAlphabet[j] + word.slice(i + 1));
            }
        }
        for (i = 0; i <= word.length; i++) {
            for (j in thisAlphabet) {
                edits.push(word.slice(0, i) + thisAlphabet[j] + word.slice(i));
            }
        }
        return edits;
    }
    order(candidates, min, max) {
        const orderedCandidates = [];
        let current;
        let i;
        let w;
        for (i = max; i >= min; i--) {
            if (candidates.hasOwnProperty(i)) {
                current = candidates[i];
                for (w in current) {
                    if (current.hasOwnProperty(w)) {
                        orderedCandidates.push({ word: w, score: i });
                    }
                }
            }
        }
        return orderedCandidates;
    }
    reset() {
        return this.load({}, { reset: true });
    }
    load(corpus, opts) {
        opts = opts || {};
        opts.reset = opts.reset !== false;
        opts.store = opts.store !== false;
        opts.afterStore = opts.afterStore || this.noop;
        opts.corpus = corpus || opts.corpus || '';
        if (opts.reset) {
            this.dict = {};
        }
        if ('object' === typeof opts.corpus) {
            for (const key in opts.corpus) {
                this.addWord(key, { score: opts.corpus[key] });
            }
        }
        else {
            this.train(opts.corpus);
        }
        if (opts.store) {
            this.store(opts.afterStore);
        }
    }
    addWord(word, opts) {
        if (typeof opts === 'number' || typeof opts === 'string') {
            opts = { score: parseInt(opts.toString()) };
        }
        opts = opts || {};
        opts.score = opts.score || 1;
        opts.store = opts.store || true;
        opts.done = opts.done || this.noop;
        word = word.toLowerCase();
        this.dict[word] = this.dict.hasOwnProperty(word)
            ? this.dict[word] + opts.score
            : opts.score;
        if (opts.store) {
            this.store(opts.done);
        }
    }
    removeWord(word, opts) {
        opts = opts || {};
        opts.store = opts.store !== false;
        opts.done = opts.done || this.noop;
        if (this.dict.hasOwnProperty(word)) {
            delete this.dict[word];
        }
        if (opts.store) {
            this.store(opts.done);
        }
    }
    suggest(word, alphabet) {
        if (this.dict.hasOwnProperty(word)) {
            return [{ word: word, score: this.dict[word] }];
        }
        const edits1 = this.edits(word, alphabet);
        const candidates = {};
        let min;
        let max;
        let current_count;
        const getCandidates = (word) => {
            if (this.dict.hasOwnProperty(word)) {
                current_count = this.dict[word];
                if (candidates.hasOwnProperty(current_count)) {
                    candidates[current_count][word] = true;
                }
                else {
                    candidates[current_count] = {};
                    candidates[current_count][word] = true;
                }
                max = max ? (max < current_count ? current_count : max) : current_count;
                min = min ? (min > current_count ? current_count : min) : current_count;
            }
        };
        edits1.forEach(getCandidates);
        if (!this.isEmpty(candidates)) {
            return this.order(candidates, min, max);
        }
        edits1.forEach((edit1) => {
            this.edits(edit1, alphabet).forEach(getCandidates);
        });
        if (!this.isEmpty(candidates)) {
            return this.order(candidates, min, max);
        }
        return [];
    }
    lucky(word, alphabet) {
        const suggest = this.suggest(word, alphabet)[0];
        if (suggest && suggest.hasOwnProperty('word')) {
            return suggest.word;
        }
        return;
    }
    export() {
        return { corpus: this.dict };
    }
}
exports.Suggest = Suggest;
//# sourceMappingURL=suggest.js.map