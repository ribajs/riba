import { HttpService, EventDispatcher } from "@ribajs/core";
import Debug from "debug";
import { SyncOptions, SyncProgress } from "../interfaces/shopify-sync";
import { io, Socket } from "@ribajs/shopify-tda";

// TODO singleton?
export class ShopifyApiSyncService extends EventDispatcher {
  public static instance?: ShopifyApiSyncService;

  protected debug = Debug("services:ShopifyApiSyncService");
  protected baseUrl = `/shopify/sync`;
  protected socket?: typeof Socket;
  protected host: string;

  /**
   *
   * @param host https://tda-dev.artandcode.studio or https://the-developer-app.artandcode.studio
   */
  constructor(host = window.location.protocol + "//" + window.location.host) {
    super("shopify-api-sync-service");
    this.host = host;
    if (ShopifyApiSyncService.instance) {
      return ShopifyApiSyncService.instance;
    }
    this.debug("constructor");
    // https:///tda-dev.artandcode.studio/shopify/sync/socket.io or https://the-developer-app.artandcode.studio/shopify/sync/socket.io
    this.socket = io({
      path: "/shopify/sync/socket.io",
      transports: ["websocket", "polling"],
    });
    this.socket?.on("connect", () => {
      this.debug("connect");
      this.trigger("connect");
    });

    this.socket?.on("exception", (data: any) => {
      console.error("exception", data);
      this.trigger("exception", data);
    });

    this.socket?.on("sync-exception", (data: any) => {
      console.error("sync-exception", data);
      this.trigger("sync-exception", data);
    });

    this.socket?.on("sync", (progress: SyncProgress) => {
      this.debug("sync", progress);
      this.trigger("sync", progress);
    });

    this.socket?.on(`sync-ended`, (progress: SyncProgress) => {
      this.debug("sync-ended", progress);
      this.trigger("sync-ended", progress);
    });

    this.socket?.on(`sync-success`, (progress: SyncProgress) => {
      this.debug("sync-success", progress);
      this.trigger("sync-success", progress);
    });

    this.socket?.on(`sync-failed`, (progress: SyncProgress) => {
      this.debug("sync-failed", progress);
      this.trigger("sync-failed", progress);
    });

    this.socket?.on(`sync-cancelled`, (progress: SyncProgress) => {
      this.debug("sync-cancelled", progress);
      this.trigger("sync-cancelled", progress);
    });

    ShopifyApiSyncService.instance = this;
  }

  public async start(options: Partial<SyncOptions>) {
    options.syncToDb = !!options.syncToDb;
    options.syncToSwiftype = !!options.syncToSwiftype;
    options.includeTransactions = !!options.includeTransactions;
    options.includeOrders = !!options.includeOrders;
    options.includeTransactions = !!options.includeTransactions;
    options.includeProducts = !!options.includeProducts;
    options.includePages = !!options.includePages;
    options.includeSmartCollections = !!options.includeSmartCollections;
    options.includeCustomCollections = !!options.includeCustomCollections;
    options.resync = !!options.resync;
    options.cancelExisting = !!options.cancelExisting;
    this.debug("start", options);
    return HttpService.post(this.baseUrl, options, "json").then(
      (progress: SyncProgress) => {
        this.debug("start progress", progress);
        return progress;
      }
    );
  }

  public async cancel() {
    return HttpService.delete(this.baseUrl, null, "json").then(
      (result: any) => {
        this.debug("cancel result", result);
        return result;
      }
    );
  }

  public async get() {
    return HttpService.getJSON(this.baseUrl + "/latest").then(
      (progress: SyncProgress) => {
        this.debug("Last progress", progress);
        return progress;
      }
    );
  }

  public async list() {
    return HttpService.getJSON(this.baseUrl).then(
      (progress: SyncProgress[]) => {
        this.debug("list progress", progress);
        return progress;
      }
    );
  }
}
