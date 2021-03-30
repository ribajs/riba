import Debug from "debug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { ShopifyNestContentComponent } from "../content/content.component";
import { ShopifyApiBlogsService } from "../../services/shopify-api-blog.service";
import { Blog } from "@ribajs/shopify-tda";
import pugTemplate from "./content-blogs.component.pug";

export interface Scope {
  blogs: Blog[];
}

export interface IContentBlog extends Blog {
  href?: string;
}

export class ShopifyNestContentBlogsComponent extends ShopifyNestContentComponent {
  public static tagName = "shopify-nest-content-blogs";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestContentBlogsComponent.tagName
  );

  protected scope: Scope = {
    blogs: [],
  };

  constructor(
    element?: HTMLElement,
    readonly shopifyApiBlogsService = ShopifyApiBlogsService.getSingleton()
  ) {
    super();
    this.shopifyApiBlogsService = shopifyApiBlogsService;
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestContentBlogsComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    return this.shopifyApiBlogsService
      .list()
      .then((blogs) => {
        if (blogs) {
          this.scope.blogs = blogs;
        }
        return this.scope.blogs;
      })
      .then((blogs: Array<IContentBlog>) => {
        for (const blog of blogs) {
          blog.href = `/view/content/blogs/${blog.id}`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
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
