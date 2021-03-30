import Debug from "debug";
import {
  ShopifyNestApiExplorerComponent,
  APIParam,
  APIListItem,
  Scope as IBaseScope,
} from "../api-explorer/api-explorer.component";

import { FacebookApiService } from "../../services/facebook-api.service";

export interface Scope extends IBaseScope {
  langcode?: string;
  self: ShopifyNestApiExplorerFacebookComponent;
  result: string;
  currentParams: APIParam[];
  currentQueries: APIParam[];
  currentUrl: string;
  currentSelectApi: APIListItem;
  send: ShopifyNestApiExplorerComponent["send"];
  apiList: ShopifyNestApiExplorerComponent["apiList"];
  selectApi: ShopifyNestApiExplorerComponent["selectApi"];
  selectFreestyleApi: ShopifyNestApiExplorerComponent["selectFreestyleApi"];
  selectApiParamValue: ShopifyNestApiExplorerFacebookComponent["selectApiParamValue"];
  selectApiQueryValue: ShopifyNestApiExplorerFacebookComponent["selectApiQueryValue"];
}

export class ShopifyNestApiExplorerFacebookComponent extends ShopifyNestApiExplorerComponent {
  public static tagName = "shopify-nest-api-explorer-facebook";

  protected apiService = FacebookApiService.getSingleton();

  protected apiList: APIListItem[] = [
    {
      // Freestyle
      label: "Freestyle",
      url: "/facebook/api",
      short_desc: "components.apiExplorer.freestyle.short_desc",
      freestyle: true,
    },
    {
      // Retrieves your facebook user name and id.
      label: "facebook/api/user",
      url: "facebook/api/user",
      short_desc: "components.apiExplorer.facebook.user.short_desc",
      roles: ["shopify-staff-member"],
    },
    {
      // Retrieves your facebook user picture image.
      label: "facebook/api/user/picture",
      url: "facebook/api/user/picture?type=small",
      short_desc: "components.apiExplorer.facebook.user.picture.short_desc",
      roles: ["shopify-staff-member"],
    },
    {
      // Retrieves your facebook user pages your user has access to
      label: "facebook/api/user/pages",
      url: "facebook/api/user/pages",
      short_desc: "components.apiExplorer.facebook.user.pages.short_desc",
      roles: ["shopify-staff-member"],
    },
    {
      // Retrieves a list of facebook posts by your user account.
      label: "facebook/api/posts/user",
      url: "facebook/api/posts/user?limit=0",
      short_desc: "components.apiExplorer.facebook.posts.user.short_desc",
      roles: ["shopify-staff-member"],
    },
    {
      // Retrieves a list of facebook posts by a page.
      label: "facebook/api/posts/:page_id",
      url: "facebook/api/posts/:page_id?limit=0",
      short_desc: "components.apiExplorer.facebook.posts.pageId.short_desc",
      roles: [],
    },
    {
      // Retrieves a single facebook post by post id.
      label: "facebook/api/post/:post_id",
      url: "facebook/api/post/:post_id",
      short_desc: "components.apiExplorer.facebook.post.postId.short_desc",
      roles: [],
    },
    {
      // Retrieves a list of comments of a post by post id. Mainly used for comments pagination
      label: "facebook/api/post/:post_id/comments",
      url: "facebook/api/post/:post_id/comments?limit=0",
      short_desc:
        "components.apiExplorer.facebook.post.postId.comments.short_desc",
      roles: [],
    },
  ];

  protected scope: Scope = {
    langcode: "en",
    self: this,
    result: "",
    currentParams: [],
    currentQueries: [],
    currentUrl: "",
    currentSelectApi: this.apiList[0],
    send: this.send,
    apiList: this.apiList,
    selectApi: this.selectApi,
    selectFreestyleApi: this.selectFreestyleApi,
    selectApiParamValue: this.selectApiParamValue,
    selectApiQueryValue: this.selectApiQueryValue,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestApiExplorerFacebookComponent.tagName
  );
  constructor() {
    super();
  }

  protected async loadParamValues(param: APIParam) {
    this.debug("loadParamValues", param);
    if (!param.dependenciesResolved) {
      this.debug(
        `Dependencies for this parameter '${param.name}' not resolved`
      );
      return;
    }
    switch (param.name) {
      case "page_id":
        return this.loadFacebookPageIdParamValues();
        break;
      case "post_id":
        return this.loadFacebookPostIdParamValues();
        break;
    }
  }

  protected async loadFacebookPageIdParamValues(/*param: APIParam*/) {
    return this.apiService.pages().then((pages) => {
      const pageIDs = new Array<string>();
      pages.data.forEach((page: any) => {
        if (page.id) {
          pageIDs.push(page.id);
        }
      });
      return pageIDs;
    });
  }

  protected async loadFacebookPostIdParamValues(/*param: APIParam*/) {
    return this.apiService.posts().then((posts) => {
      const postIDs = new Array<string>();
      posts.data.forEach((post: any) => {
        if (post.id) {
          postIDs.push(post.id);
        }
      });
      return postIDs;
    });
  }

  protected async loadQueryValues(query: APIParam) {
    this.debug("loadParamValues", query);
    switch (query.name) {
      case "type":
        query.type = "dropdown";
        query.values = ["small", "normal", "album", "large", "square"];
        break;
      case "limit":
        query.type = "number";
        query.value = 0;
        break;
      default:
        break;
    }
    return query;
  }
}
