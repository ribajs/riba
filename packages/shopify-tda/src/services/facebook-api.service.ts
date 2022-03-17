import { HttpService } from "@ribajs/core";
import { IFbRequest } from "./../interfaces/facebook-api/base.js";
import { FbPage } from "./../interfaces/facebook-api/pages.js";
import { IFbPostData } from "./../interfaces/facebook-api/post.js";
import { BaseApiService } from "./base.service.js";

export class FacebookApiService extends BaseApiService {
  public static instance?: FacebookApiService;

  protected baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/facebook/api";
  }

  public static getSingleton(host?: string) {
    if (FacebookApiService.instance) {
      return FacebookApiService.instance;
    }
    FacebookApiService.instance = new FacebookApiService(host);
    return FacebookApiService.instance;
  }

  /**
   * Retrieves your facebook user pages your user has access to
   */
  public async pages() {
    const res = await HttpService.getJSON<IFbRequest<FbPage>>(
      `${this.baseUrl}/user/pages`
    );
    const pages = res.body;
    console.debug("[services:FacebookApiService] pages", pages);
    return pages;
  }

  public async posts() {
    const res = await HttpService.getJSON<IFbRequest<IFbPostData>>(
      `${this.baseUrl}/posts/user`
    );
    const posts = res.body;
    console.debug("[services:FacebookApiService] posts", posts);
    return posts;
  }
}
