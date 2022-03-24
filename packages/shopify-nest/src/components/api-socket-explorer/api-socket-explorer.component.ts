import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { htmlToElement, hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import Debug from "debug";
import { LocalesStaticService } from "@ribajs/i18n";
import { Product } from "@ribajs/shopify-tda";
import { WebhooksService } from "../../services/webhooks.service.js";
import { ShopifyApiProductService } from "../../services/shopify-api-product.service.js";
import productCreatesTestDatas from "../../tests/data/products/creates.data.js";
import productUpdatesTestDatas from "../../tests/data/products/updates.data.js";

import pugTemplate from "./api-socket-explorer.component.pug";

interface Scope extends ScopeBase {
  simulate?: ShopifyNestApiSocketExplorerComponent["simulate"];
  langcode?: string;
}

export class ShopifyNestApiSocketExplorerComponent extends Component {
  public static tagName = "shopify-nest-api-socket-explorer";

  protected webhooksService = new WebhooksService();
  protected apProductService = ShopifyApiProductService.getSingleton();
  protected localesService = LocalesStaticService.getInstance("main");

  protected cardContainer: HTMLDivElement | null = null;

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestApiSocketExplorerComponent.tagName
  );

  public scope: Scope = {
    simulate: this.simulate,
    langcode: "en",
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestApiSocketExplorerComponent.observedAttributes);
  }

  /**
   * Creates a dummy product, updates this products and deletes the product again.
   */
  public simulate() {
    this.debug("simulate");
    this.apProductService
      .create(productCreatesTestDatas[0])
      .then((product) => {
        this.debug("product created", product);
        return this.apProductService.update(
          product.id,
          productUpdatesTestDatas[0]
        );
      })
      .then((product) => {
        this.debug("product updated", product);
        return this.apProductService.delete(product.id);
      })
      .then((product) => {
        this.debug("product deleted", product);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  protected initLocales() {
    // set avaible langcodes
    this.scope.langcode = this.localesService.getLangcode();
    this.localesService.event.on(
      "changed",
      (changedLangcode: string /*, initial: boolean*/) => {
        // Activate localcode and disable the other
        this.scope.langcode = changedLangcode;
      }
    );
  }

  protected async beforeBind() {
    this.initLocales();
    this.debug("beforeBind");
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    this.cardContainer = this.querySelector<HTMLDivElement>(".card-container");
    this.watchSocketEvents();
  }

  protected prependNewSocketCard(eventName: string, data: any, role?: string) {
    this.debug("prependNewSocketCard", eventName, data);

    for (const key in data) {
      if (data[key] && typeof data[key] === "string") {
        data[key] = data[key].replace(/&quot;/g, '"');
      }
    }

    const newCard = htmlToElement(
      `<shopify-nest-socket-event-card class="col-auto" event="${eventName}" data='${JSON.stringify(
        data
      ).replace(/'/g, `&#39;`)}' role="${
        role || ""
      }"></shopify-nest-socket-event-card>`
    );
    this.debug("newCard", newCard);
    if (this.cardContainer && newCard) {
      this.cardContainer.prepend(newCard);
      this.debug("cardContainer", this.cardContainer);
      this.build();
    }
  }

  protected watchSocketEvents() {
    this.webhooksService.on(
      "webhook:carts/create",
      (data: any) => {
        this.prependNewSocketCard(
          "webhook:carts/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:carts/update",
      (data: any) => {
        this.prependNewSocketCard("carts/update", data, "shopify-staff-member");
      },
      this
    );

    this.webhooksService.on(
      "webhook:checkouts/create",
      (data: any) => {
        this.prependNewSocketCard(
          "checkouts/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:checkouts/update",
      (data: any) => {
        this.prependNewSocketCard(
          "checkouts/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:checkouts/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "checkouts/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:collections/create",
      (data: any) => {
        this.prependNewSocketCard(
          "collections/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:collections/update",
      (data: any) => {
        this.prependNewSocketCard(
          "collections/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:collections/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "collections/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:collection_listings/add",
      (data: any) => {
        this.prependNewSocketCard(
          "collection_listings/add",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:collection_listings/remove",
      (data: any) => {
        this.prependNewSocketCard(
          "collection_listings/remove",
          data,
          "shopify-staff-member"
        );
      }
    );

    this.webhooksService.on(
      "webhook:collection_listings/update",
      (data: any) => {
        this.prependNewSocketCard(
          "collection_listings/update",
          data,
          "shopify-staff-member"
        );
      }
    );

    this.webhooksService.on(
      "webhook:customers/create",
      (data: any) => {
        this.prependNewSocketCard(
          "customers/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customers/disable",
      (data: any) => {
        this.prependNewSocketCard(
          "customers/disable",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customers/enable",
      (data: any) => {
        this.prependNewSocketCard(
          "customers/enable",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customers/update",
      (data: any) => {
        this.prependNewSocketCard(
          "customers/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customers/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "customers/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customer_groups/create",
      (data: any) => {
        this.prependNewSocketCard(
          "customer_groups/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customer_groups/update",
      (data: any) => {
        this.prependNewSocketCard(
          "customer_groups/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:customer_groups/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "customer_groups/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:draft_orders/create",
      (data: any) => {
        this.prependNewSocketCard(
          "draft_orders/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:draft_orders/update",
      (data: any) => {
        this.prependNewSocketCard(
          "draft_orders/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:fulfillments/create",
      (data: any) => {
        this.prependNewSocketCard(
          "fulfillments/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:fulfillments/update",
      (data: any) => {
        this.prependNewSocketCard(
          "fulfillments/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:fulfillment_events/create",
      (data: any) => {
        this.prependNewSocketCard(
          "fulfillment_events/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:fulfillment_events/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "fulfillment_events/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_items/create",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_items/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_items/update",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_items/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_items/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_items/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_levels/connect",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_levels/connect",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_levels/update",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_levels/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:inventory_levels/disconnect",
      (data: any) => {
        this.prependNewSocketCard(
          "inventory_levels/disconnect",
          data,
          "shopify-staff-member"
        );
      }
    );

    this.webhooksService.on(
      "webhook:locations/create",
      (data: any) => {
        this.prependNewSocketCard(
          "locations/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:locations/update",
      (data: any) => {
        this.prependNewSocketCard(
          "locations/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:locations/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "locations/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/cancelled",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/cancelled",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/create",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/fulfilled",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/fulfilled",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/paid",
      (data: any) => {
        this.prependNewSocketCard("orders/paid", data, "shopify-staff-member");
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/partially_fulfilled",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/partially_fulfilled",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/updated",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/updated",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:orders/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "orders/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:order_transactions/create",
      (data: any) => {
        this.prependNewSocketCard(
          "order_transactions/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:products/create",
      (product: Product) => {
        this.debug("products/create", product);
        let role: string | undefined;
        // Unpublised products can only be recived in the app backend
        if (product.published_at === null) {
          role = "shopify-staff-member";
        }
        this.prependNewSocketCard("products/create", product, role);
      },
      this
    );

    this.webhooksService.on(
      "webhook:products/update",
      (product: Product) => {
        this.debug("products/update", product);
        let role: string | undefined;
        // Unpublised products can only be recived in the app backend
        if (product.published_at === null) {
          role = "shopify-staff-member";
        }
        this.prependNewSocketCard("products/update", product, role);
      },
      this
    );

    this.webhooksService.on(
      "webhook:products/delete",
      (data: { id: string }) => {
        this.debug("products/delete", data);
        this.prependNewSocketCard("products/delete", data);
      },
      this
    );

    this.webhooksService.on(
      "webhook:product_listings/add",
      (data: any) => {
        this.prependNewSocketCard(
          "product_listings/add",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:product_listings/remove",
      (data: any) => {
        this.prependNewSocketCard(
          "product_listings/remove",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:product_listings/update",
      (data: any) => {
        this.prependNewSocketCard(
          "product_listings/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:refunds/create",
      (data: any) => {
        this.prependNewSocketCard(
          "refunds/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:app/uninstalled",
      (data: any) => {
        this.prependNewSocketCard("app/uninstalled", data);
      },
      this
    );

    this.webhooksService.on(
      "webhook:shop/update",
      (data: any) => {
        this.prependNewSocketCard("shop/update", data, "shopify-staff-member");
      },
      this
    );

    this.webhooksService.on(
      "webhook:themes/create",
      (data: any) => {
        this.prependNewSocketCard(
          "themes/create",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:themes/publish",
      (data: any) => {
        this.prependNewSocketCard(
          "themes/publish",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:themes/update",
      (data: any) => {
        this.prependNewSocketCard(
          "themes/update",
          data,
          "shopify-staff-member"
        );
      },
      this
    );

    this.webhooksService.on(
      "webhook:themes/delete",
      (data: any) => {
        this.prependNewSocketCard(
          "themes/delete",
          data,
          "shopify-staff-member"
        );
      },
      this
    );
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
