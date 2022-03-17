import { HttpService } from "@ribajs/core";
import { Blog } from "../interfaces/shopify-api/blog.js";
import { BaseApiService } from "./base.service.js";

export class ShopifyApiBlogsService extends BaseApiService {
  public static instance?: ShopifyApiBlogsService;

  protected baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/shopify/api/blogs";
  }

  public static getSingleton(host?: string) {
    if (ShopifyApiBlogsService.instance) {
      return ShopifyApiBlogsService.instance;
    }
    ShopifyApiBlogsService.instance = new ShopifyApiBlogsService(host);
    return ShopifyApiBlogsService.instance;
  }

  /**
   * List blogs
   */
  public async list() {
    const res = await HttpService.getJSON<Blog[]>(`${this.baseUrl}`);
    const blogs = res.body;
    console.debug("[ShopifyApiBlogsService] blogs", blogs);
    return blogs;
  }
}
