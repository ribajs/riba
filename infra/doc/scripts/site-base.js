/**
 * Shared by build-demos.js and watch-demos.js.
 *
 * Both scripts build the same demos with the same base, and a drift between
 * them would silently produce two different sets of asset URLs — the full
 * build and the incremental watch would not agree on what to serve.
 */

/**
 * URL base for the built demos. VITE_BASE_PATH when it is absolute, a plain
 * root base otherwise. Always ends with '/', because it is concatenated with
 * `demos/<id>/` directly.
 * @returns {string} base path starting and ending with '/'
 */
export function resolveSiteBase() {
  const fromEnv = process.env.VITE_BASE_PATH;
  if (fromEnv && fromEnv.startsWith('/')) {
    // A base without a trailing slash would be concatenated as
    // `/subpathdemos/...`, which silently breaks every asset URL.
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`;
  }
  return '/';
}