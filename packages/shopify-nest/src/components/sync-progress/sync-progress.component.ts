import { Component } from "@ribajs/core";
import Debug from "debug";
import pugTemplate from "./sync-progress.component.pug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { ShopifyApiSyncService } from "../../services/shopify-api-sync.service";
import { SyncProgress, SyncOptions } from "../../interfaces/shopify-sync";

interface Scope {
  start: ShopifyNestSyncProgressComponent["start"];
  cancel: ShopifyNestSyncProgressComponent["cancel"];
  restart: ShopifyNestSyncProgressComponent["restart"];
  progress: SyncProgress | null;
}

export class ShopifyNestSyncProgressComponent extends Component {
  public static tagName = "shopify-nest-sync-progress";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestSyncProgressComponent.tagName
  );
  protected syncService = new ShopifyApiSyncService();

  protected options: Partial<SyncOptions> = {
    syncToDb: true,
    syncToSwiftype: true,
    syncToEs: false,
    includeOrders: false,
    includeTransactions: false,
    includeProducts: true,
    includePages: true,
    includeSmartCollections: true,
    includeCustomCollections: true,
  };

  protected scope: Scope = {
    start: this.start,
    cancel: this.cancel,
    restart: this.restart,
    progress: null,
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestSyncProgressComponent.observedAttributes);
  }

  public start() {
    const options: SyncOptions = {
      syncToDb: this.options.syncToDb === true,
      syncToSwiftype: this.options.syncToSwiftype === true,
      syncToEs: this.options.syncToEs === true,
      includeOrders: this.options.includeOrders === true,
      includeTransactions: this.options.includeTransactions === true,
      includeProducts: this.options.includeProducts === true,
      includePages: this.options.includePages === true,
      includeSmartCollections: this.options.includeSmartCollections === true,
      includeCustomCollections: this.options.includeCustomCollections === true,
      resync: true,
      cancelExisting: false,
    };

    if (this.scope.progress) {
      this.scope.progress.state = "starting";
    } else {
      // Create new fake progress
      this.scope.progress = {
        shop: (window as any).shop,
        state: "starting",
        options,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastError: null,
      };
    }

    this.debug("start", options);
    this.scope.progress.state = "starting";
    this.syncService
      .start(options)
      .then((progress) => {
        this.debug("start progress", progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error("error on start", error);
        if (this.scope.progress) {
          this.scope.progress.state = "failed";
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  public restart() {
    const options: SyncOptions = {
      syncToDb: this.options.syncToDb === true,
      syncToEs: this.options.syncToEs === true,
      syncToSwiftype: this.options.syncToSwiftype === true,
      includeOrders: this.options.includeOrders === true,
      includeTransactions: this.options.includeTransactions === true,
      includeProducts: this.options.includeProducts === true,
      includePages: this.options.includePages === true,
      includeSmartCollections: this.options.includeSmartCollections === true,
      includeCustomCollections: this.options.includeCustomCollections === true,
      resync: true,
      cancelExisting: true,
    };
    this.debug("restart", options);

    if (this.scope.progress) {
      this.scope.progress.state = "starting";
    }

    this.syncService
      .start(options)
      .then((progress) => {
        this.debug("restart progress", progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error("error on restart", error);
        if (this.scope.progress) {
          this.scope.progress.state = "failed";
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  public cancel() {
    this.debug("cancel");
    if (this.scope.progress) {
      this.scope.progress.state = "ending";
    }

    this.syncService
      .cancel()
      .then((progress) => {
        this.debug("cancel", progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error("error on cancel", error);
        if (this.scope.progress) {
          this.scope.progress.state = "failed";
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    return this.syncService
      .get()
      .then((progress) => {
        this.debug("last progress", progress);
        this.scope.progress = progress;
      })
      .then((/*prog*/) => {
        this.syncService.on("exception", (error: any) => {
          console.error("socket.io exception", error);
        });

        this.syncService.on("sync-exception", (error: any) => {
          console.error("sync-exception", error);
          if (this.scope.progress) {
            this.scope.progress.state = "failed";
            if (error.message) {
              this.scope.progress.lastError = error.message;
            }
          }
        });

        this.syncService.on("sync", (progress: SyncProgress) => {
          this.debug("sync", progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-ended`, (progress: SyncProgress) => {
          this.debug("sync-ended", progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-success`, (progress: SyncProgress) => {
          this.debug("sync-success", progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-failed`, (progress: SyncProgress) => {
          this.debug("sync-failed", progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-cancelled`, (progress: SyncProgress) => {
          this.debug("sync-cancelled", progress);
          this.scope.progress = progress;
        });
      });
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(
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

  protected template() {
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
