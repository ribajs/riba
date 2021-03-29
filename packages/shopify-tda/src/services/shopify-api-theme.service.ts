import { HttpService } from "@ribajs/core";
import { ITheme } from "../interfaces/shopify-api/theme";
import { Asset } from "../interfaces/shopify-api/asset";
import { AssetLocale } from "../interfaces/shopify-api/asset-locale";
import { BaseApiService } from "./base.service";

export class ShopifyApiThemesService extends BaseApiService {
  public static instance?: ShopifyApiThemesService;

  protected baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/shopify/api/blogs";
  }

  public static getSingleton(host?: string) {
    if (ShopifyApiThemesService.instance) {
      return ShopifyApiThemesService.instance;
    }
    ShopifyApiThemesService.instance = new ShopifyApiThemesService(host);
    return ShopifyApiThemesService.instance;
  }

  /**
   * List themes
   */
  public async list() {
    const res = await HttpService.getJSON<ITheme[]>(`/shopify/api/themes`);
    const themes = res.body;

    console.debug("[ShopifyApiThemesService] themes", themes);
    return themes;
  }

  public async locales(id: string | number, propertyPath?: string) {
    let url = `/shopify/api/themes/${id}/locales`;
    if (propertyPath) {
      url += "/" + propertyPath;
    }
    const res = await HttpService.getJSON(url);
    const locales = res.body;
    console.debug("[ShopifyApiThemesService] locales", locales);
    return locales;
  }

  public async assets(id: string | number, key?: string) {
    let url = `/shopify/api/themes/${id}/assets`;
    if (key) {
      url += "/" + key;
    }
    const res = await HttpService.getJSON<Asset[]>(url);
    const assets = res.body;
    console.debug("[ShopifyApiThemesService] assets", assets);
    return assets;
  }

  public async assetLocalesList(id: string | number) {
    const res = await HttpService.getJSON<AssetLocale[]>(
      `/shopify/api/themes/${id}/locales/list`
    );
    const assets = res.body;
    console.debug("[ShopifyApiThemesService] assets", assets);
    return assets;
  }
}
