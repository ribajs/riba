export interface OpenGraphBook {
  /** profile array - Who wrote this book. */
  author: string | string[];
  /** The ISBN */
  isbn: string;
  /** The date the book was released. */
  release_date: Date;
  /** Tag words associated with this book. */
  tag: string | string[];
}
