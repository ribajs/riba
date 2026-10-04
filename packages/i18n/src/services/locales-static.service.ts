import type { Catalog, LocalesOptions, MessageTree } from "../types/index.js";
import { LocalesService } from "./locales.service.js";

/**
 * Messages of all languages that are already in memory, e.g. bundled with the app
 */
export class LocalesStaticService extends LocalesService {
  constructor(
    protected catalog: Catalog,
    options: LocalesOptions = {},
  ) {
    super(options);
    if (!this.langcodes.length) {
      this.langcodes = Object.keys(catalog);
    }
    // everything is in memory already, so any language can be read without a switch
    for (const [langcode, tree] of Object.entries(catalog)) {
      this.trees.set(langcode, tree);
      this.loaded.add(langcode);
    }
  }

  protected async load(langcode: string): Promise<MessageTree | undefined> {
    return this.catalog[langcode];
  }
}
