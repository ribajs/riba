import { HttpService } from "@ribajs/core/src/index.js";
import Debug from "debug";
import {
  Article,
  ShopifyApiArticleService as _ShopifyApiArticleService
} from "@ribajs/shopify-tda";

export class ShopifyApiArticleService extends _ShopifyApiArticleService {
  public static instance?: ShopifyApiArticleService;

  protected debug = Debug("services:ShopifyApiArticleService");

  protected constructor() {
    super("/");
  }

  public static getSingleton() {
    if (ShopifyApiArticleService.instance) {
      return ShopifyApiArticleService.instance;
    }
    ShopifyApiArticleService.instance = new ShopifyApiArticleService();
    return ShopifyApiArticleService.instance;
  }

  /**
   * Get article
   * @param blogId
   * @param articleId
   */
  public async update(blogId: number, articleId: number, article: Article) {
    return HttpService.put(
      `/shopify/api/blogs/${blogId}/articles/${articleId}`,
      article,
      "json"
    ).then((res) => {
      this.debug("update article", res.body);
      return res.body;
    });
  }
}
