import { Injectable } from '@nestjs/common';
import * as lunr from 'lunr';
import type { Builder, Index } from 'lunr';
import type {
  CreateOptions,
  Builders,
  Indices,
  SearchResult,
  SearchResultExt,
  Data,
  SortedPositionItem,
} from './types';

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
  protected data: Data = {};
  protected spell;

  protected getData(ns = 'main', resultRef: string) {
    const ref = this.getRef(ns);
    const data = this.data[ns]?.find((data) => data[ref] === resultRef);
    return Object.assign({}, data);
  }

  /**
   * Sort positions by end position
   * - Needed to adjust the text property backwards for highlighting, otherwise the text length will change and the positions would no longer be correct.
   * @param metadata
   * @returns
   */
  protected getSortedPositions(
    metadata: SearchResultExt['matchData']['metadata'],
  ) {
    const sortedPositions: SortedPositionItem[] = [];
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

  /**
   * Inserting string at position x of another string
   * @see https://stackoverflow.com/a/4364902/1465919
   * @param target Target string
   * @param insert String to insert in the target string
   * @param position Position to insert the string
   * @returns The new string
   */
  protected insertAt(target: string, insert: string, position: number) {
    return [target.slice(0, position), insert, target.slice(position)].join('');
  }

  /**
   * Highlights the search results in the text
   */
  protected highlightResult(result: SearchResultExt) {
    const metadata = result.matchData.metadata;
    const sortedPositions = this.getSortedPositions(metadata);

    for (const sortPos of sortedPositions) {
      const prop = sortPos.prop;
      const start = sortPos.start;
      const end = sortPos.end;
      if (result.data?.[prop]) {
        let text = result.data[prop] as string;
        if (typeof text === 'string') {
          text = this.insertAt(text, '</span>', end);
          text = this.insertAt(text, `<span class='search-highlight'>`, start);
        }
        result.data[prop] = text;
      }
    }

    return result;
  }

  /**
   * Highlights the search results in the text
   */
  protected highlightResults(results: SearchResultExt[]) {
    return results.map((result) => this.highlightResult(result));
  }

  public getRef(ns = 'main') {
    return this.getOptions(ns)?.ref || 'id';
  }

  public getOptions(ns = 'main') {
    return this.builders[ns]?.options;
  }

  /**
   * Create a new index
   *
   * @template T
   * @param namespace
   * @param [options]
   * @returns
   * @memberof LunrService
   * @see https://github.com/nextapps-de/lunr/#lunr.create
   */
  public create(namespace = 'main', options: CreateOptions = {}): Builder {
    if (this.builders[namespace]?.builder) {
      return this.builders[namespace].builder;
    }

    // TODO move to defaults
    options.metadataWhitelist = options.metadataWhitelist || [
      'position',
      'data',
      'ns',
    ];

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

      if (!this.builders[namespace]) {
        this.builders[namespace] = {};
      }

      this.builders[namespace].builder = builder;
      this.builders[namespace].options = options;
    });

    return this.builders[namespace]?.builder;
  }

  public buildIndex(namespace: string): Index {
    if (this.builders[namespace]) {
      this.indices[namespace] = this.builders[namespace]?.builder?.build();
    }
    return this.indices[namespace];
  }

  /**
   * Get an existing builder.
   *
   * @param namespace
   * @returns
   * @memberof LunrService
   */
  public getBuilder(namespace: string): Builder {
    return this.builders[namespace]?.builder;
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
   * Adds a document to the index.
   *
   * Before adding fields to the index the index should have been fully setup, with the document
   * ref and all fields to index already having been specified.
   *
   * The document must have a field name as specified by the ref (by default this is 'id') and
   * it should have all fields defined for indexing, though null or undefined values will not
   * cause errors.
   *
   * Entire documents can be boosted at build time. Applying a boost to a document indicates that
   * this document should rank higher in search results than other documents.
   *
   * @param ns - The namespace to add to the index.
   * @param doc - The document to add to the index.
   * @param attributes - Optional attributes associated with this document.
   */
  add(ns: string, doc: any, attributes?: { boost?: number }): void {
    const builder = this.getBuilder(ns);
    const options = this.getOptions(ns);
    if (!builder) {
      return null;
    }
    if (options.metadataWhitelist.includes('data')) {
      this.data[ns] = this.data[ns] || [];
      this.data[ns].push(doc);
    }
    return builder.add(doc, attributes);
  }

  /**
   * Builds the index, creating an instance of lunr.Index.
   *
   * This completes the indexing process and should only be called
   * once all documents have been added to the index.
   *
   */
  build(ns: string): Index {
    const builder = this.getBuilder(ns);
    if (!builder) {
      return null;
    }
    return builder.build();
  }

  /**
   * Applies a plugin to the index builder.
   *
   * A plugin is a function that is called with the index builder as its context.
   * Plugins can be used to customize or extend the behavior of the index
   * in some way. A plugin is just a function, that encapsulated the custom
   * behavior that should be applied when building the index.
   *
   * The plugin function will be called with the index builder as its argument, additional
   * arguments can also be passed when calling use. The function will be called
   * with the index builder as its context.
   *
   * @param plugin The plugin to apply.
   */
  use(ns: string, plugin: Builder.Plugin, ...args: any[]): void {
    const builder = this.getBuilder(ns);
    if (!builder) {
      return null;
    }
    return builder.use(plugin, ...args);
  }

  /**
   * Search in a specific namespace
   * - Sets the namespace property
   * - Merges data to the lunr search result
   * - Highlights the substrings in the text properties
   * - Resorts the merged results by score
   *
   * @param ns The namespace
   * @param query The search query
   * @returns The search results
   */
  public search(ns: string, query: string) {
    const index = this.getIndex(ns);
    const options = this.getOptions(ns);
    if (!index) {
      return null;
    }
    const resultsExt: SearchResultExt[] = [];
    const results: Partial<SearchResult>[] = index.search(query);
    if (!results) {
      return null;
    }
    for (const result of results) {
      const data = this.getData(ns, result.ref);

      const resultExt: SearchResultExt = {
        ...(result as SearchResultExt),
      };

      if (options.metadataWhitelist.includes('ns')) {
        resultExt.ns = ns;
      }

      if (options.metadataWhitelist.includes('data')) {
        resultExt.data = data;
      }

      resultsExt.push(resultExt);
    }

    this.highlightResults(resultsExt);

    resultsExt.sort((a, b) => {
      return b.score - a.score;
    });

    return resultsExt;
  }

  /**
   * Search in all namespaces for which a built index exists
   * @param query The search query
   * @returns The merged search results from all namespaces
   */
  public searchAll(query: string) {
    const searchResults: SearchResultExt[] = [];
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
}
