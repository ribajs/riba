import { HttpService } from '@ribajs/core';
import { Article } from '../interfaces/shopify-api';
import { BaseApiService } from './base.service';

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
    return HttpService.getJSON(`${this.baseUrl}/${blogId}/articles`).then(
      (articles: Article[]) => {
        console.debug('[ShopifyApiArticleService] articles', articles);
        return articles;
      },
    );
  }

  /**
   * Get article
   * @param blogId
   * @param articleId
   */
  public async get(blogId: number, articleId: number) {
    return HttpService.getJSON(
      `${this.baseUrl}/${blogId}/articles/${articleId}`,
    ).then((article: Article) => {
      console.debug('[ShopifyApiArticleService] get article', article);
      return article;
    });
  }

}
