import { HttpService } from "@ribajs/core/src/index.js";
import { Article } from "../interfaces/shopify-api";
import { BaseApiService } from "./base.service.js";

export class ShopifyApiArticleService extends BaseApiService {
  public static instance?: ShopifyApiArticleService;

  protected baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/shopify/api/blogs";
  }

  public static getSingleton(host?: string) {
    if (ShopifyApiArticleService.instance) {
      return ShopifyApiArticleService.instance;
    }
    ShopifyApiArticleService.instance = new ShopifyApiArticleService(host);
    return ShopifyApiArticleService.instance;
  }

  /**
   * List articles
   * @param blogId
   */
  public async list(blogId: number) {
    return HttpService.getJSON<Article[]>(
      `${this.baseUrl}/${blogId}/articles`
    ).then((res) => {
      console.debug("[ShopifyApiArticleService] articles", res.body);
      return res.body;
    });
  }

  /**
   * Get article
   * @param blogId
   * @param articleId
   */
  public async get(blogId: number, articleId: number) {
    return HttpService.getJSON<Article>(
      `${this.baseUrl}/${blogId}/articles/${articleId}`
    ).then((res) => {
      console.debug("[ShopifyApiArticleService] get article", res);
      return res.body;
    });
  }
}
