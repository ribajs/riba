import { HttpService } from "@ribajs/core";
import {
  InstagramApiService as _InstagramApiService,
  InstagramResponse,
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
    return HttpService.getJSON(
      `${this.baseUrl}/instagram/api/user/accounts`
    ).then((accounts: InstagramResponse<InstagramAccounts[]>) => {
      this.debug("accounts", accounts);
      return accounts;
    });
  }
}
