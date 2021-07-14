export interface OpenGraphArticle {
  /** When the article was first published. */
  published_time?: Date;
  /** When the article was last changed. */
  modified_time?: Date;
  /** When the article is out of date after. */
  expiration_time?: Date;
  /** Writers of the article. */
  author?: string;
  /** A high-level section name. E.g. Technology */
  section?: string;
  /** Tag words associated with this article. */
  tag?: string[];
}
