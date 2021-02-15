import Debug from "debug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { ShopifyNestContentComponent } from "../content/content.component";
import { ShopifyApiArticleService } from "../../services/shopify-api-article.service";
import { Article } from "@ribajs/shopify-tda";
import pugTemplate from "./content-articles.component.pug";

export interface Scope {
  articles: Array<Article>;
  blogId?: number;
}

export interface IContentArticle extends Article {
  href?: string;
}

export class ShopifyNestContentBlogArticlesComponent extends ShopifyNestContentComponent {
  public static tagName = "shopify-nest-content-articles";

  protected autobind = true;

  static get observedAttributes() {
    return ["blog-id"];
  }

  protected debug = Debug(
    "component:" + ShopifyNestContentBlogArticlesComponent.tagName
  );

  protected scope: Scope = {
    articles: [],
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
