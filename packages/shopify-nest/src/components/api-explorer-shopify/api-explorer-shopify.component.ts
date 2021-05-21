import Debug from "debug";
import {
  ShopifyNestApiExplorerComponent,
  APIParam,
  APIListItem,
  Scope,
} from "../api-explorer/api-explorer.component";

import { ShopifyApiThemesService } from "../../services/shopify-api-theme.service";
import { ShopifyApiProductService } from "../../services/shopify-api-product.service";

export class ShopifyNestApiExplorerShopifyComponent extends ShopifyNestApiExplorerComponent {
  public static tagName = "shopify-nest-api-explorer-shopify";

  protected apiThemesService = ShopifyApiThemesService.getSingleton();
  protected apProductService = ShopifyApiProductService.getSingleton();

  protected apiList: APIListItem[] = [
    /**
     * Get a list of all themes
     */
    {
      label: "Freestyle",
      url: "/shopify/api/themes",
      short_desc: "components.apiExplorer.freestyle.short_desc",
      freestyle: true,
    },
    /**
     * Get a list of all themes
     */
    {
      label: "/shopify/api/themes",
      url: "/shopify/api/themes",
      short_desc: "components.apiExplorer.shopify.themes.all.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get single active theme
     */
    {
      label: "/shopify/api/themes/active",
      url: "/shopify/api/themes/active",
      short_desc: "components.apiExplorer.shopify.themes.active.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get informations about a theme by id
     */
    {
      label: "/shopify/api/themes/:theme_id",
      url: "/shopify/api/themes/:theme_id",
      short_desc: "components.apiExplorer.shopify.themes.theme_id.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get a list of all assets files
     * @note For security reasons, this is only allowed from shopify backend (role: shopify-staff-member)
     */
    {
      label: "/shopify/api/themes/:theme_id/assets",
      url: "/shopify/api/themes/:theme_id/assets",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.list.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get theme asset file by filename
     * @note This is allowed to be used from any user in the theme
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/assets/:assets_filename",
      url: "/shopify/api/themes/:theme_id/assets/:assets_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.assets_filename.short_desc",
      roles: [],
    },
    /**
     * Get theme templates file by filename
     * @note This is allowed to be used from any user in the theme
     */
    {
      label:
        "/shopify/api/themes/:theme_id/assets/templates/:templates_filename",
      url: "/shopify/api/themes/:theme_id/assets/:templates_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.templates_filename.short_desc",
      roles: [],
    },
    /**
     * Get theme snippets file by filename
     * @note This is allowed to be used from any user in the theme
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/snippets/:snippets_filename",
      url: "/shopify/api/themes/:theme_id/assets/:snippets_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.snippets_filename.short_desc",
      roles: [],
    },
    /**
     * Get theme config file by filename
     * @note For security reasons, this is only allowed from shopify backend (role: shopify-staff-member)
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/config/:config_filename",
      url: "/shopify/api/themes/:theme_id/assets/:config_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.config_filename.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get theme layout file by filename
     * @note For security reasons, this is only allowed from shopify backend (role: shopify-staff-member)
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/layout/:layout_filename",
      url: "/shopify/api/themes/:theme_id/assets/:layout_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.layout_filename.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get theme locales file by filename
     * @note For security reasons, this is only allowed from shopify backend (role: shopify-staff-member)
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/locales/:locales_filename",
      url: "/shopify/api/themes/:theme_id/assets/:locales_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.locales_filename.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get theme sections file by filename
     * @note For security reasons, this is only allowed from shopify backend (role: shopify-staff-member)
     */
    {
      label: "/shopify/api/themes/:theme_id/assets/sections/:sections_filename",
      url: "/shopify/api/themes/:theme_id/assets/:sections_filename",
      short_desc:
        "components.apiExplorer.shopify.themes.assets.sections_filename.short_desc",
      roles: ["shopify-staff-member"],
    },
    /**
     * Get all language translations for a theme
     */
    {
      label: "/shopify/api/themes/:theme_id/locales",
      url: "/shopify/api/themes/:theme_id/locales",
      short_desc:
        "components.apiExplorer.shopify.themes.locales.all.short_desc",
      roles: [],
    },
    /**
     * Get a list of locale asset files for a theme
     */
    {
      label: "/shopify/api/themes/:theme_id/locales/list",
      url: "/shopify/api/themes/:theme_id/locales/list",
      short_desc:
        "components.apiExplorer.shopify.themes.locales.list.short_desc",
      roles: [],
    },
    /**
     * Get locales json file
     */
    {
      label: "/shopify/api/themes/:theme_id/locales/*.json",
      url: "/shopify/api/themes/:theme_id/locales/*.json",
      short_desc:
        "components.apiExplorer.shopify.themes.locales.json.short_desc",
      roles: [],
    },
    /**
     * Get locals of sections file
     */
    {
      label: "/shopify/api/themes/:theme_id/locales/*.liquid",
      url: "/shopify/api/themes/:theme_id/locales/*.liquid",
      short_desc:
        "components.apiExplorer.shopify.themes.locales.liquid.short_desc",
      roles: [],
    },
    /**
     * Get all locales or get a subset by iterate into the json e.g. by the language code or deeper
     */
    {
      label: "/shopify/api/themes/:theme_id/locales/:property_path*",
      url: "/shopify/api/themes/:theme_id/locales/:property_path*",
      short_desc:
        "components.apiExplorer.shopify.themes.locales.property_path.short_desc",
      roles: [],
    },
    /**
     * Retrieves a list of products directly from shopify.
     * @see https://help.shopify.com/en/api/reference/products/product#index
     */
    {
      label: "/shopify/api/products",
      url: '/shopify/api/products?collection_id=""&created_at_max=""&created_at_min=""&ids=""&page=""&fields=""&limit=0&product_type=""&published_at_max=""&published_at_min=""&since_id=0&title=""&updated_at_max=""&updated_at_min=""&vendor=""',
      short_desc: "components.apiExplorer.shopify.products.short_desc",
      roles: [],
    },
    /**
     * Retrieves a count of products directly from shopify.
     * @see https://help.shopify.com/en/api/reference/products/product#count
     */
    {
      label: "/shopify/api/products/count",
      url: '/shopify/api/products/count?collection_id=""&created_at_max=""&created_at_min=""&product_type=""&published_at_max=""&published_at_min=""&updated_at_max=""&updated_at_min=""&vendor=""',
      short_desc: "components.apiExplorer.shopify.products.count.short_desc",
      roles: [],
    },
    /**
     * Retrieves a single product directly from shopify.
     * @see https://help.shopify.com/en/api/reference/products/product#show
     */
    {
      label: "/shopify/api/products/:product_id",
      url: "/shopify/api/products/:product_id",
      short_desc:
        "components.apiExplorer.shopify.products.product_id.short_desc",
      roles: [],
    },

    /**
     * Retrieves a list of pages directly from shopify.
     */
    {
      label: "/shopify/api/pages",
      url: '/shopify/api/pages?created_at_max=""&created_at_min=""&page=""&fields=""&handle=""&limit=0&published_at_max=""&published_at_min=""&since_id=0&title=""&updated_at_max=""&updated_at_min=""',
      short_desc: "components.apiExplorer.shopify.pages.short_desc",
      roles: [],
    },
    /**
     * Retrieves a count of pages directly from shopify.
     */
    {
      label: "/shopify/api/pages/count",
      url: '/shopify/api/pages/count?created_at_max=""&created_at_min=""&title=""&published_at_max=""&published_at_min=""&updated_at_max=""&updated_at_min=""',
      short_desc: "components.apiExplorer.shopify.pages.count.short_desc",
      roles: [],
    },
    /**
     * Retrieves a single product directly from shopify.
     */
    {
      label: "/shopify/api/pages/:page_id",
      url: "/shopify/api/pages/:page_id",
      short_desc: "components.apiExplorer.shopify.pages.page_id.short_desc",
      roles: [],
    },
    /**
     * Retrieves a list of smart collections from shopify.
     */
    {
      label: "/shopify/api/smart-collections",
      url: "/shopify/api/smart-collections",
      short_desc:
        "components.apiExplorer.shopify.pages.smart-collections.short_desc",
      roles: [],
    },
    /**
     * Retrieves a count of smart collections directly from shopify.
     */
    {
      label: "/shopify/api/smart-collections/count",
      url: "/shopify/api/smart-collections/count",
      short_desc:
        "components.apiExplorer.shopify.pages.smart-collections.short_desc",
      roles: [],
    },
    /**
     * Retrieves a single smart collection by it's id directly from shopify.
     */
    {
      label: "/shopify/api/smart-collections/:smart-collections_id",
      url: "/shopify/api/smart-collections/:smart-collections_id",
      short_desc:
        "components.apiExplorer.shopify.pages.smart-collections.smart-collections_id.short_desc",
      roles: [],
    },

    /**
     * Retrieves a list of custom collections from shopify.
     */
    {
      label: "/shopify/api/custom-collections",
      url: "/shopify/api/custom-collections",
      short_desc:
        "components.apiExplorer.shopify.pages.custom-collections.short_desc",
      roles: [],
    },
    /**
     * Retrieves a count of custom collections directly from shopify.
     */
    {
      label: "/shopify/api/custom-collections/count",
      url: "/shopify/api/custom-collections/count",
      short_desc:
        "components.apiExplorer.shopify.pages.custom-collections.short_desc",
      roles: [],
    },
    /**
     * Retrieves a single custom collection by it's id directly from shopify.
     */
    {
      label: "/shopify/api/custom-collections/:custom-collections_id",
      url: "/shopify/api/custom-collections/:custom-collections_id",
      short_desc:
        "components.apiExplorer.shopify.pages.custom-collections.custom-collections_id.short_desc",
      roles: [],
    },
  ];

  public scope: Scope = {
    langcode: "en",
    self: this,
    result: "",
    currentParams: [],
    currentQueries: [],
    currentUrl: "",
    currentSelectApi: this.apiList[0],
    send: this.send,
    apiList: this.apiList,
    selectApi: this.selectApi,
    selectFreestyleApi: this.selectFreestyleApi,
    selectApiParamValue: this.selectApiParamValue,
    selectApiQueryValue: this.selectApiQueryValue,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestApiExplorerShopifyComponent.tagName
  );
  constructor() {
    super();
  }

  protected async loadParamValues(param: APIParam) {
    this.debug("loadParamValues", param);
    if (!param.dependenciesResolved) {
      this.debug(
        `Dependencies for this parameter '${param.name}' not resolved`
      );
      return;
    }
    switch (param.name) {
      case "theme_id":
        return this.loadThemeIdParamValues();
      case "key":
        return this.loadAssetKeyParamValues(param);
      case "assets_filename":
        return this.loadAssetKeyParamValues(param, "assets/");
      case "templates_filename":
        return this.loadAssetKeyParamValues(param, "templates/");
      case "config_filename":
        return this.loadAssetKeyParamValues(param, "config/");
      case "layout_filename":
        return this.loadAssetKeyParamValues(param, "layout/");
      case "locales_filename":
        return this.loadAssetKeyParamValues(param, "locales/");
      case "sections_filename":
        return this.loadAssetKeyParamValues(param, "sections/");
      case "snippets_filename":
        return this.loadAssetKeyParamValues(param, "snippets/");
      case ".json":
        // return this.loadThemeLocalesParamValues(param);
        return this.loadAssetKeyParamValues(param, "locales/", true);
      case ".liquid":
        return this.loadAssetKeyParamValues(param, "sections/", true);
      case "property_path":
        return this.loadThemeLocalesPathParamValues();
      case "product_id":
        return this.loadProductIdsParamValues();
    }
  }

  protected async loadThemeIdParamValues(/*param: APIParam*/) {
    return this.apiThemesService.list().then((themes) => {
      const ids = new Array<number>();
      themes.forEach((theme) => {
        ids.push(theme.id);
      });
      return ids;
    });
  }

  protected async loadAssetKeyParamValues(
    param: APIParam,
    byPath?: string,
    justFilname = false
  ) {
    let themeId: string | number | undefined;
    for (const para of this.scope.currentParams) {
      if (para.name === "theme_id") {
        themeId = para.value;
      }
    }
    if (!themeId) {
      throw new Error("Theme ID is not set");
    }
    return (
      this.apiThemesService
        .assets(themeId)
        .then((assets) => {
          const assetPaths = new Array<string>();
          assets.forEach((asset) => {
            assetPaths.push(asset.key);
          });
          return assetPaths;
        })
        // filter by byPath
        .then((assets) => {
          if (byPath) {
            assets = assets.filter((asset) => {
              return asset.startsWith(byPath);
            });
          }
          return assets;
        })
        // remove path if justFilname is true
        .then((assets) => {
          if (justFilname) {
            for (let index = 0; index < assets.length; index++) {
              const pieces = assets[index].split("/");
              assets[index] = pieces[pieces.length - 1];
            }
          }
          return assets;
        })
    );
  }

  protected async loadThemeLocalesPathParamValues(/*param: APIParam*/) {
    let themeId: string | number | undefined;
    for (const para of this.scope.currentParams) {
      if (para.name === "theme_id") {
        themeId = para.value;
      }
    }
    if (!themeId) {
      throw new Error("Theme ID is not set");
    }
    return this.apiThemesService.locales(themeId).then((locales) => {
      return this.getLocalesPath(locales);
    });
  }

  protected async loadProductIdsParamValues(/*param: APIParam*/) {
    return this.apProductService.list().then((products) => {
      const productIds = new Array<number>();
      products.forEach((product: any) => {
        productIds.push(product.id);
      });
      return productIds;
    });
  }

  protected getLocalesPath(
    locales: any,
    prefix = "",
    depth = 0,
    depthLimit = 3
  ) {
    if (depth >= depthLimit) {
      return [];
    }
    const keys = new Array<string>();
    for (const key in locales) {
      if (locales[key]) {
        keys.push(prefix + key);
        const subLocale = locales[key];
        if (typeof subLocale === "object") {
          const subKeys = this.getLocalesPath(
            subLocale,
            prefix + key + "/",
            depth + 1,
            depthLimit
          );
          keys.push(...subKeys);
        }
      }
    }
    return keys;
  }

  protected async loadQueryValues(query: APIParam) {
    this.debug("loadParamValues", query);
    switch (query.name) {
      default:
        return query;
        break;
    }
  }
}
