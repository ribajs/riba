import { I18nService, interpolate } from "@ribajs/i18n";
import type { LocalesService, LocalVars } from "@ribajs/i18n";

/** The locales service of the doc site, `undefined` where the i18n module is not registered (unit tests). */
export function getLocalesService(): LocalesService | undefined {
  try {
    return I18nService.getLocalesService();
  } catch {
    return undefined;
  }
}

/**
 * A UI string for code that builds text itself. The English `fallback` is the
 * source: it is returned until the service is ready and when the active
 * language has no entry for the key.
 */
export function uiText(key: string, fallback: string, vars?: LocalVars) {
  const service = getLocalesService();
  const translated = service?.ready ? service.lookup(key, vars) : undefined;
  return translated ?? interpolate(fallback, vars);
}
