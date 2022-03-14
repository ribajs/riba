import { HttpService } from "@ribajs/core/src/index.js";
import {
  InstagramApiService as _InstagramApiService,
  InstagramData,
} from "@ribajs/shopify-tda";
import Debug from "debug";
import { InstagramAccounts } from "./../interfaces/instagram-api/accounts";

export class InstagramApiService extends _InstagramApiService {
  public static instance?: InstagramApiService;

  protected debug = Debug("services:AuthService");

  protected constructor(host = "/") {
    super(host);
  }

  public static getSingleton() {
    if (InstagramApiService.instance) {
      return InstagramApiService.instance;
    }
    InstagramApiService.instance = new InstagramApiService();
    return InstagramApiService.instance;
  }

  public async accounts() {
    return HttpService.getJSON<InstagramData<InstagramAccounts[]>>(
      `${this.baseUrl}/user/accounts`
    ).then((res) => {
      const accounts = res.body;
      this.debug("accounts", accounts);
      return accounts;
    });
  }
}
