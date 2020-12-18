/**
 *
 */
export interface AssetLocale {
  /**
   * The path to the asset within a theme. It consists of the file's directory and filename. For example, the asset assets/bg-body-green.gif is in the assets directory, so its key is assets/bg-body-green.gif.
   */
  key: string;

  /**
   * Locales object with translations.
   */
  locales: any | null;

  /**
   * The asset size in bytes.
   */
  size: number;

  /**
   * The ID for the theme that an asset belongs to.
   */
  theme_id: number;

  /**
   * The language code of the locale file
   */
  lang_code: string | null;

  /**
   * True if the locale file is the default locale file
   */
  is_default: boolean | null;
}
