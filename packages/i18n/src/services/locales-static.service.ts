import { LocalesService } from "../types/locales-service.js";

export class LocalesStaticService extends LocalesService {
  public static instances: {
    [id: string]: LocalesStaticService;
  } = {};

  public static getInstance(id = "main") {
    return LocalesStaticService.instances[id];
  }

  /**
   * The current defined langcode
   */
  protected currentLangcode?: string;

  /**
   * The default theme langcode before any language was chosen
   */
  protected initialLangcode?: string;

  constructor(
    protected locales: any,
    protected id?: string,
    doNotTranslateDefaultLanguage = false,
    showMissingTranslation = false,
  ) {
    super(doNotTranslateDefaultLanguage, showMissingTranslation);
    if (!id) {
      id = "main";
    }

    this.locales = locales;

    if (LocalesStaticService.instances[id]) {
      return LocalesStaticService.instances[id];
    }

    this.init();
    LocalesStaticService.instances[id] = this;
  }

  /**
   * Get file with all languages
   * @param themeID
   */
  protected async getAll(/*themeID?: number*/) {
    return this.locales;
  }
}
