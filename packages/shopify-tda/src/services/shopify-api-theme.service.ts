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
    return HttpService.getJSON(`/shopify/api/themes`).then(
      (themes: ITheme[]) => {
        console.debug("[ShopifyApiThemesService] themes", themes);
        return themes;
      }
    );
  }

  public async locales(id: string | number, propertyPath?: string) {
    let url = `/shopify/api/themes/${id}/locales`;
    if (propertyPath) {
      url += "/" + propertyPath;
    }
    return HttpService.getJSON(url).then((locales: any) => {
      console.debug("[ShopifyApiThemesService] locales", locales);
      return locales;
    });
  }

  public async assets(id: string | number, key?: string) {
    let url = `/shopify/api/themes/${id}/assets`;
    if (key) {
      url += "/" + key;
    }
    return HttpService.getJSON(url).then((assets: Asset[]) => {
      console.debug("[ShopifyApiThemesService] assets", assets);
      return assets;
    });
  }

  public async assetLocalesList(id: string | number) {
    return HttpService.getJSON(`/shopify/api/themes/${id}/locales/list`).then(
      (assets: AssetLocale[]) => {
        console.debug("[ShopifyApiThemesService] assets", assets);
        return assets;
      }
    );
  }
}
