import { HttpService } from "@ribajs/core";
import type { LocalesOptions, MessageTree } from "../types/index.js";
import { LocalesService } from "./locales.service.js";

export interface LocalesRestOptions extends LocalesOptions {
  /**
   * Fetch the messages of the source language too.
   * Off by default: the markup is the source, so its catalog is not needed.
   */
  loadSourceCatalog?: boolean;
}

export type LocalesUrl = string | ((langcode: string) => string);

/**
 * Messages fetched over HTTP, one request per language the first time it is needed
 */
export class LocalesRestService extends LocalesService {
  protected requests = new Map<string, Promise<unknown>>();

  constructor(
    protected url: LocalesUrl,
    protected restOptions: LocalesRestOptions = {},
  ) {
    super(restOptions);
    if (!url) {
      throw new Error("[i18n] The url of LocalesRestService is required.");
    }
  }

  /** Hook to change a url right before it is requested, e.g. to add a query */
  protected buildUrl(url: string, _langcode: string): string {
    return url;
  }

  /** Hook to pick the messages of one language out of the response body */
  protected parse(body: unknown, _langcode: string): MessageTree | undefined {
    return body as MessageTree | undefined;
  }

  protected urlFor(langcode: string) {
    const url = typeof this.url === "function" ? this.url(langcode) : this.url;
    return this.buildUrl(url, langcode);
  }

  /** Requests to the same url are shared, also if several languages live in one file */
  protected fetchJSON(url: string): Promise<unknown> {
    let request = this.requests.get(url);
    if (!request) {
      request = HttpService.getJSON<unknown>(url)
        .then((response) => response.body)
        .catch((error: unknown) => {
          // a failed request must be retried by the next load
          this.requests.delete(url);
          throw error;
        });
      this.requests.set(url, request);
    }
    return request;
  }

  protected async load(langcode: string): Promise<MessageTree | undefined> {
    if (
      langcode === this.sourceLangcode &&
      !this.restOptions.loadSourceCatalog
    ) {
      return undefined;
    }
    const body = await this.fetchJSON(this.urlFor(langcode));
    return this.parse(body, langcode);
  }
}
