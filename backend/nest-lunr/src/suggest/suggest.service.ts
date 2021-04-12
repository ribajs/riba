import { Injectable } from '@nestjs/common';

// TODO Maybe an good alternative: https://github.com/wooorm/nspell

/**
 * javascript spell checker based on
 * https://github.com/dscape/spell
 *
 *
 * copyright 2011 nuno job       <nunojob.com> (oO)--',--
 *                pedro teixeira <metaduck.com>
 *
 * licensed under the apache license, version 2.0 (the "license");
 * you may not use this file except in compliance with the license.
 * you may obtain a copy of the license at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * unless required by applicable law or agreed to in writing, software
 * distributed under the license is distributed on an "as is" basis,
 * without warranties or conditions of any kind, either express or implied.
 * see the license for the specific language governing permissions and
 * limitations under the license.
 */
@Injectable()
export class SuggestService {
  protected dict: { [word: string]: number } = {};
  protected dictStore: any;
  protected alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  protected noop() {
    /**/
  }

  protected isEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  /**
   * Set a place to store
   *
   * @param dictStore object that implements two functions `get` to retrieve a stored dictionary from disk/memory `store` to store a dictionary from disk/memory
   */
  public setStorage(dictStore: any) {
    this.dictStore = dictStore;
    if (dictStore && typeof dictStore.get === 'function') {
      this.dict = dictStore.get();
    }
  }

  protected store(cb: () => void) {
    if (this.dictStore && typeof this.dictStore.store === 'function') {
      this.dictStore.store(this.dict, cb);
    }
  }

  protected train(corpus: string, regex?: RegExp) {
    let match: RegExpExecArray;
    let word: string;
    regex = regex || /[a-z]+/g;
    corpus = corpus.toLowerCase();
    while ((match = regex.exec(corpus))) {
      word = match[0];
      this.addWord(word, { score: 1 });
    }
  }

  protected edits(word: string, alphabetOverride: string[]) {
    const edits = [];
    const thisAlphabet = alphabetOverride ? alphabetOverride : this.alphabet;
    let i: number;
    let j: string;
    for (i = 0; i < word.length; i++) {
      // deletion
      edits.push(word.slice(0, i) + word.slice(i + 1));
    }
    for (i = 0; i < word.length - 1; i++) {
      // transposition
      edits.push(
        word.slice(0, i) +
          word.slice(i + 1, i + 2) +
          word.slice(i, i + 1) +
          word.slice(i + 2),
      );
    }
    for (i = 0; i < word.length; i++) {
      // alteration
      for (j in thisAlphabet) {
        edits.push(word.slice(0, i) + thisAlphabet[j] + word.slice(i + 1));
      }
    }
    for (i = 0; i <= word.length; i++) {
      // insertion
      for (j in thisAlphabet) {
        edits.push(word.slice(0, i) + thisAlphabet[j] + word.slice(i));
      }
    }
    return edits;
  }

  protected order(candidates: any, min: number, max: number) {
    const ordered_candidates = [];
    let current: any;
    let i: number;
    let w: string;
    for (i = max; i >= min; i--) {
      if (candidates.hasOwnProperty(i)) {
        current = candidates[i];
        for (w in current) {
          if (current.hasOwnProperty(w)) {
            ordered_candidates.push({ word: w, score: i });
          }
        }
      }
    }
    return ordered_candidates;
  }

  /**
   * reset
   *
   * resets the dictionary.
   *
   * e.g.
   * spell.reset();
   *
   * @return void
   */
  public reset() {
    return this.load({}, { reset: true });
  }

  /**
   * load
   *
   * loads a free form corpus dictionary.
   *
   * e.g.
   * spell.load({'dog': 1, 'cat': 2});
   * spell.load('dog cat cat');
   *
   * @param corpus corpus string to initialize to
   * @param opts.corpus corpus string to initialize to
   * @param opts.reset whether you want to reset the existing dictionary or just append to what already exists
   * @param opts.store decide if you want to use storage
   * @param opts.after_store function to call back when store is done
   *
   * @return void
   */
  public load(
    corpus?: string | { [word: string]: number },
    opts?: {
      corpus?: string | { [word: string]: number };
      reset?: boolean;
      store?: boolean;
      after_store?: () => void;
    },
  ) {
    opts = opts || {};
    opts.reset = opts.reset !== false;
    opts.store = opts.store !== false;
    opts.after_store = opts.after_store || this.noop;
    opts.corpus = corpus || opts.corpus || '';
    if (opts.reset) {
      this.dict = {};
    }
    if ('object' === typeof opts.corpus) {
      for (const key in opts.corpus) {
        this.addWord(key, { score: opts.corpus[key] });
      }
    } else {
      this.train(opts.corpus);
    }
    if (opts.store) {
      this.store(opts.after_store);
    }
  }

  /**
   * add word
   *
   * loads a word into the dictionary
   *
   * e.g.
   * spell.insert_word('dog', 5);
   *
   * @param word the word you want to add
   * @param opts.count number of times the word appears in a text, defaults to one
   * @param opts.store decide if you want to use storage
   * @param opts.done function to call back when store is done
   *
   * @return void
   */
  public addWord(
    word: string,
    opts?:
      | number
      | string
      | {
          count?: number;
          store?: boolean;
          score?: number;
          corpus?: string;
          done?: () => void;
        },
  ) {
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

  /**
   * remove word
   *
   * removes word from the dictionary
   *
   * e.g.
   * spell.removeWord('dog');
   *
   * @param word the word you want to add
   * @param opts.store decide if you want to use storage
   * @param opts.done function to call back when store is done
   *
   * @return void
   */
  public removeWord(
    word: string,
    opts?: { store?: boolean; done?: () => void },
  ) {
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

  /**
   * suggest
   *
   * returns spelling suggestions for a given word
   *
   * e.g.
   * spell.suggest('speling');
   *
   * @param word the word you want to spell check
   * @param alphabet if you need to override checking for just words you can set this and it will enable you to make suggestions that include punctuation etc
   *
   * @return ordered array containing json objects such as [{"word": "spelling", "score": 10}]
   */
  public suggest(word: string, alphabet?: string[]) {
    if (this.dict.hasOwnProperty(word)) {
      return [{ word: word, score: this.dict[word] }];
    }
    const edits1 = this.edits(word, alphabet);
    const candidates = {};
    let min: number;
    let max: number;
    let current_count: number;
    const getCandidates = (word: string) => {
      if (this.dict.hasOwnProperty(word)) {
        current_count = this.dict[word];
        if (candidates.hasOwnProperty(current_count)) {
          candidates[current_count][word] = true;
        } else {
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
    return []; // no suggestions
  }

  /**
   * feeling lucky
   *
   * returns the first spelling correction for a word
   *
   * e.g.
   * spell.lucky('speling');
   *
   * @param word the word you want to spell check
   * @param alphabet if you need to override checking for just words you can set this and it will enable you to make suggestions that include punctuation etc
   *
   * @return the most likely match
   */
  public lucky(word: string, alphabet?: string[]): string {
    const suggest = this.suggest(word, alphabet)[0];
    if (suggest && suggest.hasOwnProperty('word')) {
      return suggest.word;
    }
    return;
  }

  /**
   * export
   *
   * exports the dictionary
   *
   * e.g.
   * spell.export();
   *
   * @return dictionary
   */
  public export(): any {
    return { corpus: this.dict };
  }
}
