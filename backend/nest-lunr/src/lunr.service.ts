import { Injectable } from '@nestjs/common';
import * as lunr from 'lunr';
import type { Builder, Index } from 'lunr';
import type { CreateOptions, Builders, Indices, SearchResult } from './types';

@Injectable()
export class LunrService {
  /**
   * Original lunr creation method
   *
   * @static
   * @memberof LunrService
   */
  public static lunr = lunr;

  protected builders: Builders = {};
  protected indices: Indices = {};

  /**
   * Create a new index
   *
   * @template T
   * @param {string} namespace
   * @param {CreateOptions} [options]
   * @returns
   * @memberof LunrService
   * @see https://github.com/nextapps-de/lunr/#lunr.create
   */
  public create(namespace = 'main', options: CreateOptions = {}): Builder {
    if (this.builders[namespace]) {
      return this.builders[namespace];
    }
    LunrService.lunr((builder) => {
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

  public buildIndex(namespace: string): Index {
    if (this.builders[namespace]) {
      this.indices[namespace] = this.builders[namespace]?.build();
    }
    return this.indices[namespace];
  }

  /**
   * Get an existing builder.
   *
   * @param {string} namespace
   * @returns
   * @memberof LunrService
   */
  public getBuilder(namespace: string): Builder {
    return this.builders[namespace];
  }

  /**
   * Get an existing builder.
   *
   * @param {string} namespace
   * @returns
   * @memberof LunrService
   */
  public getIndex(namespace: string): Index {
    if (!this.indices[namespace]) {
      return this.buildIndex(namespace);
    }
    return this.indices[namespace];
  }

  /**
   * Returns all namespaces for which a built index exists
   * @returns All namespaces for which a built index exists
   */
  public getNamespaces() {
    return Object.keys(this.indices);
  }

  /**
   * Search in a specific namespace
   * @param ns The namespace
   * @param query The search query
   * @returns The search results
   */
  public search(ns: string, query: string) {
    const index = this.getIndex(ns);
    if (!index) {
      return null;
    }
    const results: Partial<SearchResult>[] = index.search(query);
    if (!results) {
      return null;
    }
    for (const result of results) {
      result.ns = ns;
    }
    return results as SearchResult[];
  }

  /**
   * Search in all namespaces for which a built index exists
   * @param query The search query
   * @returns The merged search results from all namespaces
   */
  public searchAll(query: string) {
    const searchResults: Partial<SearchResult[]> = [];
    const namespaces = this.getNamespaces();
    for (const ns of namespaces) {
      const results = this.search(ns, query);
      if (results) {
        searchResults.push(...results);
      }
    }
    return searchResults;
  }
}
