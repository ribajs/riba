import { Injectable } from '@nestjs/common';
import {
  SuggestByNamespace,
  Storage,
  Dictionary,
  LoadOptions,
  AddWordOptions,
  RemoveWordOptions,
  SuggestResultExt,
} from './types';
import { Suggest } from './suggest';

@Injectable()
export class SuggestService {
  protected suggests: SuggestByNamespace = {};

  public create(ns: string, storage?: Storage) {
    if (this.suggests.hasOwnProperty(ns)) {
      return this.suggests[ns];
    }

    this.suggests[ns] = new Suggest(storage);
    return this.suggests[ns];
  }

  public get(ns: string) {
    return this.suggests[ns] || null;
  }

  /**
   * Returns all existing namespaces
   */
  public getNamespaces() {
    return Object.keys(this.suggests);
  }

  public ignore(ns: string, ignoreWords: string | string[]) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.ignore(ignoreWords);
  }

  public reset(ns: string) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.reset();
  }

  public load(ns: string, corpus?: string | Dictionary, opts?: LoadOptions) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.load(corpus, opts);
  }

  public addWord(
    ns: string,
    word: string,
    opts?: number | string | AddWordOptions,
  ) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.addWord(word, opts);
  }

  public removeWord(ns: string, word: string, opts?: RemoveWordOptions) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.removeWord(word, opts);
  }

  public suggest(ns: string, word: string, alphabet?: string[]) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.suggest(word, alphabet);
  }

  public suggestAll(word: string, alphabet?: string[]) {
    const namespaces = this.getNamespaces();
    const allResults: SuggestResultExt[] = [];
    for (const ns of namespaces) {
      const results = this.suggest(ns, word, alphabet);
      if (results) {
        for (const result of results) {
          const exists = allResults.find(
            (allResult) => allResult.word === result.word,
          );
          if (exists) {
            // Merge existing word to result
            exists.ns.push(ns);
            exists.score += result.score;
          } else {
            // Add new word to result
            allResults.push({ ...result, ns: [ns] });
          }
        }
      }
    }

    allResults.sort((a, b) => {
      return b.score - a.score;
    });

    return allResults;
  }

  public lucky(ns: string, word: string, alphabet?: string[]) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.lucky(word, alphabet);
  }

  public luckyAll(word: string, alphabet?: string[]) {
    const suggestions = this.suggestAll(word, alphabet);
    return suggestions[0]?.word;
  }

  public export(ns: string) {
    const suggest = this.get(ns);
    if (!suggest) {
      throw new Error(`Namespace "${ns}" not found!`);
    }
    return suggest.export();
  }
}
