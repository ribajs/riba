import { HttpService } from '@ribajs/core';
import { IFbRequest } from './../interfaces/facebook-api/base';
import { FbPage } from './../interfaces/facebook-api/pages';
import { IFbPostData } from './../interfaces/facebook-api/post';
import { BaseApiService } from './base.service';

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
    return HttpService.getJSON(`${this.baseUrl}/user/pages`).then(
      (pages: IFbRequest<FbPage>) => {
        console.debug('[services:FacebookApiService] pages', pages);
        return pages;
      },
    );
  }

  public async posts() {
    return HttpService.getJSON(`${this.baseUrl}/posts/user`).then(
      (posts: IFbRequest<IFbPostData>) => {
        console.debug('[services:FacebookApiService] posts', posts);
        return posts;
      },
    );
  }
}
