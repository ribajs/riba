import { HttpService } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Product } from "./../interfaces/shopify-api";
import { io, Socket } from "../dependencies/socket-io-client";
import { BaseApiService } from "./base.service";

export class ShopifyApiProductService extends BaseApiService {
  public static instance?: ShopifyApiProductService;

  protected baseUrl: string;

  protected socket?: Socket;
  protected events = new EventDispatcher("shopify-api-product-service");
  public on: EventDispatcher["on"];
  public once: EventDispatcher["once"];

  protected constructor(host?: string) {
    super(host);
    this.on = this.events.on.bind(this.events);
    this.once = this.events.once.bind(this.events);

    this.baseUrl = `${this.host}/shopify/api/products`;

    console.debug("[ShopifyApiProductService] constructor");
    this.socket = io({
      path: `/socket.io/shopify/api/products`,
      transports: ["websocket", "polling"],
    });
    this.socket?.on("connect", () => {
      console.debug("[ShopifyApiProductService] connect");
      this.events.trigger("connect");
    });

    this.socket?.on("exception", (data: any) => {
      console.error("exception", data);
      this.events.trigger("exception", data);
    });

    this.socket?.on("all", (product: any) => {
      console.debug("[ShopifyApiProductService] all", product);
      this.events.trigger("all", product);
    });
  }

  public static getSingleton(host?: string) {
    if (ShopifyApiProductService.instance) {
      return ShopifyApiProductService.instance;
    }
    ShopifyApiProductService.instance = new ShopifyApiProductService(host);
    return ShopifyApiProductService.instance;
  }

  /**
   * Retrieves a list of products directly from shopify.
   * @param limit
   */
  public async list(limit?: string | number) {
    let url = `${this.baseUrl}`;
    if (limit) {
      url += "?limit=" + limit;
    }
    return HttpService.getJSON(url).then((products: Product[]) => {
      console.debug("[ShopifyApiProductService] products", products);
      return products;
    });
  }

  public async all(options = {}) {
    if (this.socket) {
      this.socket.emit("all", options);
    }
  }
}
