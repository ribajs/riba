import { FacebookApiService as _FacebookApiService } from '@ribajs/shopify-tda';

export class FacebookApiService extends _FacebookApiService {
  public static instance?: FacebookApiService;

  protected constructor() {
    super('/');
  }

  public static getSingleton() {
    if (FacebookApiService.instance) {
      return FacebookApiService.instance;
    }
    FacebookApiService.instance = new FacebookApiService();
    return FacebookApiService.instance;
  }
}
