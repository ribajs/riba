/* eslint-disable @typescript-eslint/ban-types */
import type { Fields, PluginOption } from '.';
import type { tokenizer, Pipeline } from 'lunr';

export interface CreateOptions {
  /**
   * Document fields to index.
   */
  fields?: Fields | string[];

  /**
   * The inverted index maps terms to document fields.
   */
  invertedIndex?: object;

  /**
   * Keeps track of document term frequencies.
   */
  documentTermFrequencies?: object;

  /**
   * Keeps track of the length of documents added to the index.
   */
  documentLengths?: object;

  /**
   * Function for splitting strings into tokens for indexing.
   */
  tokenizer?: typeof tokenizer;

  /**
   * The pipeline performs text processing on tokens before indexing.
   */
  pipeline?: Pipeline;

  /**
   * A pipeline for processing search terms before querying the index.
   */
  searchPipeline?: Pipeline;

  /**
   * Keeps track of the total number of documents indexed.
   */
  documentCount?: number;

  /**
   * A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
   */
  b?: number;

  /**
   * A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
   */
  k1?: number;

  /**
   * A counter incremented for each unique term, used to identify a terms position in the vector space.
   */
  termIndex?: number;

  /**
   * A list of metadata keys that have been allowed for entry in the index.
   */
  metadataAllowList?: string[];

  /**
   * Sets the document field used as the document reference. Every document must have this field.
   * The type of this field in the document should be a string, if it is not a string it will be
   * coerced into a string by calling toString.
   *
   * The default ref is 'id'.
   *
   * The ref should _not_ be changed during indexing, it should be set before any documents are
   * added to the index. Changing it during indexing can lead to inconsistent results.
   *
   */
  ref?: string;

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
   */
  plugins?: PluginOption[];

  data?: {
    /**
     * Set this to true if you want to return the original data with the search result.
     */
    include?: boolean;

    /**
     * Set this to true if you want to highlight the text in the original data.
     * Please note that for this the option data.include must be `true` and you need to allow the `position` key in metadataAllowList.
     */
    highlight?: boolean;
  };
}
