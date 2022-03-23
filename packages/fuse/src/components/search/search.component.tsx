import Fuse from 'fuse.js';
import { Component, TemplateFunction } from "@ribajs/core";
import { FuseSearchComponentScope, JsxFuseSearchProps } from "../../types/index.js";

export class FuseSearchComponent<T = any,> extends Component {
  public static tagName = "fuse-search";

  public fuse?: Fuse<any>;

  static get observedAttributes(): (keyof JsxFuseSearchProps)[] {
    return ["items", "options", "limit", "search-pattern"];
  }

  requiredAttributes(): (keyof JsxFuseSearchProps)[] {
    return ["items"];
  }

  public scope: FuseSearchComponentScope<T> = {
    items: [],
    searchPattern: "",
    options: {},
    limit: -1,
    results: [],
    search: this.search
  };

  constructor() {
    super();
  }

  public search() {
    if (!this.fuse) {
      console.warn("fuse is not ready! Did you forget to call initFuse?");
      return [];
    }
    this.scope.results = this.fuse?.search<T>(this.scope.searchPattern) || [];
    console.debug("on search", this.scope.searchPattern, this.scope.results);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(FuseSearchComponent.observedAttributes);
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);

    if (attributeName === 'items') {
      console.debug("parsedAttributeChangedCallback items", newValue);
      this.initFuse();
    }
  }


  protected async afterBind() {
    await super.afterBind();
    this.initFuse();
  }

  protected getAllFuseKeys(items?: any) {
    let testItem: any;
    if (Array.isArray(items) && items.length > 0) {
      testItem = items[0];
    } else {
      testItem = items;
    }
    if (!testItem) {
      return [];
    }
    const keys: string[] = [];
    for (const key of Object.keys(testItem)) {
      if (testItem[key] && (typeof (testItem[key]) === "object" || Array.isArray(testItem[key]))) {
        const childKeys = this.getAllFuseKeys(testItem[key]);
        for (const childKey of childKeys) {
          keys.push(`${key}.${childKey}`);
        }
      } else {
        keys.push(key);
      }
    }
    return keys;
  }

  protected initFuse() {
    if (!this.scope.items?.length) {
      return;
    }
    if (!this.scope.options.keys?.length) {
      this.scope.options.keys = this.getAllFuseKeys(this.scope.items);
    }
    this.fuse = new Fuse(this.scope.items, this.scope.options);
    console.debug("initFuse", this.scope.items, this.scope.options, this.fuse );
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
