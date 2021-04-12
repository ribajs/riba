import { Injectable } from '@nestjs/common';
import {
  SuggestByNamespace,
  Storage,
  Dictionary,
  LoadOptions,
  AddWordOptions,
  RemoveWordOptions,
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

  public reset(ns: string) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
    }
    return suggest.reset();
  }

  public load(ns: string, corpus?: string | Dictionary, opts?: LoadOptions) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
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
      return null;
    }
    return suggest.addWord(word, opts);
  }

  public removeWord(ns: string, word: string, opts?: RemoveWordOptions) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
    }
    return suggest.removeWord(word, opts);
  }

  public suggest(ns: string, word: string, alphabet?: string[]) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
    }
    return suggest.suggest(word, alphabet);
  }

  public lucky(ns: string, word: string, alphabet?: string[]) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
    }
    return suggest.lucky(word, alphabet);
  }

  public export(ns: string) {
    const suggest = this.get(ns);
    if (!suggest) {
      return null;
    }
    return suggest.export();
  }
}
