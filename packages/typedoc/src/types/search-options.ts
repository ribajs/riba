export interface SearchOptions {
  /** The base url of the remote search server */
  serverBaseUrl: string;
  /** Replace the search element with a custom element for out of the box working remote search */
  replaceElement: boolean;
  /** Insert client-side javascript into the theme */
  script: boolean;
}
