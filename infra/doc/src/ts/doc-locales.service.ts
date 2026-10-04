import { LocalesRestService } from "@ribajs/i18n";
import type { MessageTree } from "@ribajs/i18n";
import { docI18nLocales } from "./doc-i18n-locales.js";

/**
 * The catalogs of the doc site (`locales/<lang>.json`, built by
 * scripts/build-locales.js) plus the bundled de/en messages of the `i18n-static`
 * examples. Those examples show a language switch with English text that is not
 * in the markup, so English needs its own entries.
 */
export class DocLocalesService extends LocalesRestService {
  protected async load(langcode: string): Promise<MessageTree | undefined> {
    const remote = await super.load(langcode);
    const examples = (docI18nLocales as Record<string, MessageTree>)[langcode];
    if (!remote && !examples) {
      return undefined;
    }
    return { ...examples, ...remote };
  }
}
