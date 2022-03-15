import { HttpService } from "@ribajs/core/src/index.js";
import { BaseApiService } from "./base.service.js";
import { InstagramMediaResponse } from "../interfaces/instagram-api/media-response";

export class InstagramApiService extends BaseApiService {
  public static instance?: InstagramApiService;
  public baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/instagram/api";
  }

  public static getSingleton(host?: string) {
    if (InstagramApiService.instance) {
      return InstagramApiService.instance;
    }
    InstagramApiService.instance = new InstagramApiService(host);
    return InstagramApiService.instance;
  }

  public async media(
    instagramBusinessAccountID: string,
    limit = 0,
    fields = "caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}"
  ) {
    const url = `${this.baseUrl}/media/${instagramBusinessAccountID}`;
    const data: any = {
      fields,
      limit
    };
    if ((window as any).Shopify.shop) {
      data.shop = (window as any).Shopify.shop;
    }

    const res = await HttpService.getJSON<InstagramMediaResponse>(url, data);
    return res.body;
  }
}
