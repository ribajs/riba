import { EventDispatcher } from "@ribajs/events";
import Debug from "debug";
import { io, Socket } from "@ribajs/shopify-tda";

export class WebhooksService extends EventDispatcher {
  public static instance?: WebhooksService;

  protected socket?: Socket;
  protected debug = Debug("services:WebhooksService");
  constructor(
    protected readonly host = window.location.protocol +
      "//" +
      window.location.host
  ) {
    super("shopify-webhooks-service");
    this.host = host;
    this.debug("constructor");
    this.debug("host: " + host);
    if (WebhooksService.instance) {
      return WebhooksService.instance;
    }
    this.init();
    WebhooksService.instance = this;
  }

  public async joinBackend(options = {}) {
    if (this.socket) {
      this.socket.emit("join-backend", options);
    }
  }

  public async joinTheme(options = {}) {
    if (this.socket) {
      this.socket.emit("join-theme", options);
    }
  }

  public async init() {
    this.debug("init");
    this.socket = io({
      path: "/socket.io/shopify/api/webhooks",
      transports: ["polling"], // ['polling', 'websocket']
      autoConnect: true,
    });
    this.socket?.on("connect", () => {
      this.debug("connect");
      this.trigger("connect");
      this.joinBackend();
    });

    this.socket?.on("exception", (data: any) => {
      console.error("exception", data);
      this.trigger("exception", data);
    });

    this.socket?.on("disconnect", () => {
      this.debug("disconnect");
      this.trigger("disconnect");
    });

    this.socket?.on("carts/create", (data: any) => {
      this.debug("carts/create", data);
      this.trigger("webhook:carts/create", data);
    });

    this.socket?.on("carts/update", (data: any) => {
      this.debug("carts/update", data);
      this.trigger("webhook:carts/update", data);
    });

    this.socket?.on("checkouts/create", (data: any) => {
      this.debug("checkouts/create", data);
      this.trigger("webhook:checkouts/create", data);
    });

    this.socket?.on("checkouts/update", (data: any) => {
      this.debug("checkouts/update", data);
      this.trigger("webhook:checkouts/update", data);
    });

    this.socket?.on("checkouts/delete", (data: any) => {
      this.debug("checkouts/delete", data);
      this.trigger("webhook:checkouts/delete", data);
    });

    this.socket?.on("collections/create", (data: any) => {
      this.debug("collections/create", data);
      this.trigger("webhook:collections/create", data);
    });

    this.socket?.on("collections/update", (data: any) => {
      this.debug("collections/update", data);
      this.trigger("webhook:collections/update", data);
    });

    this.socket?.on("collections/delete", (data: any) => {
      this.debug("collections/delete", data);
      this.trigger("webhook:collections/delete", data);
    });

    this.socket?.on("collection_listings/add", (data: any) => {
      this.debug("collection_listings/add", data);
      this.trigger("webhook:collection_listings/add", data);
    });

    this.socket?.on("collection_listings/remove", (data: any) => {
      this.debug("collection_listings/remove", data);
      this.trigger("webhook:collection_listings/remove", data);
    });

    this.socket?.on("collection_listings/update", (data: any) => {
      this.debug("collection_listings/update", data);
      this.trigger("webhook:collection_listings/update", data);
    });

    this.socket?.on("customers/create", (data: any) => {
      this.debug("customers/create", data);
      this.trigger("webhook:customers/create", data);
    });

    this.socket?.on("customers/disable", (data: any) => {
      this.debug("customers/disable", data);
      this.trigger("webhook:customers/disable", data);
    });

    this.socket?.on("customers/enable", (data: any) => {
      this.debug("customers/enable", data);
      this.trigger("webhook:customers/enable", data);
    });

    this.socket?.on("customers/update", (data: any) => {
      this.debug("customers/update", data);
      this.trigger("webhook:customers/update", data);
    });

    this.socket?.on("customers/delete", (data: any) => {
      this.debug("customers/delete", data);
      this.trigger("webhook:customers/delete", data);
    });

    this.socket?.on("customer_groups/create", (data: any) => {
      this.debug("customer_groups/create", data);
      this.trigger("webhook:customer_groups/create", data);
    });

    this.socket?.on("customer_groups/update", (data: any) => {
      this.debug("customer_groups/update", data);
      this.trigger("webhook:customer_groups/update", data);
    });

    this.socket?.on("customer_groups/delete", (data: any) => {
      this.debug("customer_groups/delete", data);
      this.trigger("webhook:customer_groups/delete", data);
    });

    this.socket?.on("draft_orders/create", (data: any) => {
      this.debug("draft_orders/create", data);
      this.trigger("webhook:draft_orders/create", data);
    });

    this.socket?.on("draft_orders/update", (data: any) => {
      this.debug("draft_orders/update", data);
      this.trigger("webhook:draft_orders/update", data);
    });

    this.socket?.on("fulfillments/create", (data: any) => {
      this.debug("fulfillments/create", data);
      this.trigger("webhook:fulfillments/create", data);
    });

    this.socket?.on("fulfillments/update", (data: any) => {
      this.debug("fulfillments/update", data);
      this.trigger("webhook:fulfillments/update", data);
    });

    this.socket?.on("fulfillment_events/create", (data: any) => {
      this.debug("fulfillment_events/create", data);
      this.trigger("webhook:fulfillment_events/create", data);
    });

    this.socket?.on("fulfillment_events/delete", (data: any) => {
      this.debug("fulfillment_events/delete", data);
      this.trigger("webhook:fulfillment_events/delete", data);
    });

    this.socket?.on("inventory_items/create", (data: any) => {
      this.debug("inventory_items/create", data);
      this.trigger("webhook:inventory_items/create", data);
    });

    this.socket?.on("inventory_items/update", (data: any) => {
      this.debug("inventory_items/update", data);
      this.trigger("webhook:inventory_items/update", data);
    });

    this.socket?.on("inventory_items/delete", (data: any) => {
      this.debug("inventory_items/delete", data);
      this.trigger("webhook:inventory_items/delete", data);
    });

    this.socket?.on("inventory_levels/connect", (data: any) => {
      this.debug("inventory_levels/connect", data);
      this.trigger("webhook:inventory_levels/connect", data);
    });

    this.socket?.on("inventory_levels/update", (data: any) => {
      this.debug("inventory_levels/update", data);
      this.trigger("webhook:inventory_levels/update", data);
    });

    this.socket?.on("inventory_levels/disconnect", (data: any) => {
      this.debug("inventory_levels/disconnect", data);
      this.trigger("webhook:inventory_levels/disconnect", data);
    });

    this.socket?.on("locations/create", (data: any) => {
      this.debug("locations/create", data);
      this.trigger("webhook:locations/create", data);
    });

    this.socket?.on("locations/update", (data: any) => {
      this.debug("locations/update", data);
      this.trigger("webhook:locations/update", data);
    });

    this.socket?.on("locations/delete", (data: any) => {
      this.debug("locations/delete", data);
      this.trigger("webhook:locations/delete", data);
    });

    this.socket?.on("orders/cancelled", (data: any) => {
      this.debug("orders/cancelled", data);
      this.trigger("webhook:orders/cancelled", data);
    });

    this.socket?.on("orders/create", (data: any) => {
      this.debug("orders/create", data);
      this.trigger("webhook:orders/create", data);
    });

    this.socket?.on("orders/fulfilled", (data: any) => {
      this.debug("orders/fulfilled", data);
      this.trigger("webhook:orders/fulfilled", data);
    });

    this.socket?.on("orders/paid", (data: any) => {
      this.debug("orders/paid", data);
      this.trigger("webhook:orders/paid", data);
    });

    this.socket?.on("orders/partially_fulfilled", (data: any) => {
      this.debug("orders/partially_fulfilled", data);
      this.trigger("webhook:orders/partially_fulfilled", data);
    });

    this.socket?.on("orders/updated", (data: any) => {
      this.debug("orders/updated", data);
      this.trigger("webhook:orders/updated", data);
    });

    this.socket?.on("orders/delete", (data: any) => {
      this.debug("orders/delete", data);
      this.trigger("webhook:orders/delete", data);
    });

    this.socket?.on("order_transactions/create", (data: any) => {
      this.debug("order_transactions/create", data);
      this.trigger("webhook:order_transactions/create", data);
    });

    this.socket?.on("products/create", (data: any) => {
      this.debug("products/create", data);
      this.trigger("webhook:products/create", data);
    });

    this.socket?.on("products/update", (data: any) => {
      this.debug("products/update", data);
      this.trigger("webhook:products/update", data);
    });

    this.socket?.on("products/delete", (data: any) => {
      this.debug("products/delete", data);
      this.trigger("webhook:products/delete", data);
    });

    this.socket?.on("product_listings/add", (data: any) => {
      this.debug("product_listings/add", data);
      this.trigger("webhook:product_listings/add", data);
    });

    this.socket?.on("product_listings/remove", (data: any) => {
      this.debug("product_listings/remove", data);
      this.trigger("webhook:product_listings/remove", data);
    });

    this.socket?.on("product_listings/update", (data: any) => {
      this.debug("product_listings/update", data);
      this.trigger("webhook:product_listings/update", data);
    });

    this.socket?.on("refunds/create", (data: any) => {
      this.debug("refunds/create", data);
      this.trigger("webhook:refunds/create", data);
    });

    this.socket?.on("app/uninstalled", (data: any) => {
      this.debug("app/uninstalled", data);
      this.trigger("webhook:app/uninstalled", data);
    });

    this.socket?.on("shop/update", (data: any) => {
      this.debug("shop/update", data);
      this.trigger("webhook:shop/update", data);
    });

    this.socket?.on("themes/create", (data: any) => {
      this.debug("themes/create", data);
      this.trigger("webhook:themes/create", data);
    });

    this.socket?.on("themes/publish", (data: any) => {
      this.debug("themes/publish", data);
      this.trigger("webhook:themes/publish", data);
    });

    this.socket?.on("themes/update", (data: any) => {
      this.debug("themes/update", data);
      this.trigger("webhook:themes/update", data);
    });

    this.socket?.on("themes/delete", (data: any) => {
      this.debug("themes/delete", data);
      this.trigger("webhook:themes/delete", data);
    });
  }
}
