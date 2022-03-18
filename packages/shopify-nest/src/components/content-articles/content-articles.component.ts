import Debug from "debug";
import { TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { ShopifyNestContentComponent } from "../content/content.component.js";
import { ShopifyApiArticleService } from "../../services/shopify-api-article.service.js";
import { Article } from "@ribajs/shopify-tda";
import pugTemplate from "./content-articles.component.pug";

export interface Scope extends ScopeBase {
  articles: Array<Article>;
  blogId?: number;
}

export interface IContentArticle extends Article {
  href?: string;
}

export class ShopifyNestContentBlogArticlesComponent extends ShopifyNestContentComponent {
  public static tagName = "shopify-nest-content-articles";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["blog-id"];
  }

  protected debug = Debug(
    "component:" + ShopifyNestContentBlogArticlesComponent.tagName
  );

  public scope: Scope = {
    articles: []
  };

  constructor(
    element?: HTMLElement,
    readonly shopifyApiArticleService = ShopifyApiArticleService.getSingleton()
  ) {
    super();
    this.shopifyApiArticleService = shopifyApiArticleService;
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestContentBlogArticlesComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    if (this.scope.blogId) {
      return this.shopifyApiArticleService
        .list(this.scope.blogId)
        .then((articles) => {
          this.scope.articles = articles;
          return this.scope.articles;
        })
        .then((articles: Array<IContentArticle>) => {
          for (const article of articles) {
            article.href = `/view/content/blogs/${this.scope.blogId}/articles/${article.id}`;
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
    // TODO list all articles from all bugs if we have no blogId
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
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
