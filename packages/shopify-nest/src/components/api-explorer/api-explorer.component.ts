import { Component, HttpService } from "@ribajs/core";
import { isNumber, concat, hasChildNodesTrim } from "@ribajs/utils";
import Debug from "debug";

import { DropdownService } from "@ribajs/bs4";

import pugTemplate from "./api-explorer.component.pug";

import * as monaco from "monaco-editor";
import { LocalesStaticService } from "@ribajs/i18n";

export interface APIParam {
  /**
   * Parameter name without ':' and '*'
   */
  name: string;
  /**
   * The original name with ':' and/or '*'
   */
  original: string;
  /**
   * Optional default value
   */
  defaultValue?: string | number;
  /**
   * Selected value
   */
  value?: string | number;
  /**
   * (Loaded) possible values
   */
  values: Array<string | number>;
  /**
   * Dynamic params are params wich can have a value,
   * they are displayed with a dropdown menu with his possible values
   */
  dynamic: boolean;
  /**
   * Param type
   */
  type: "text" | "dropdown" | "number";
  /**
   * Is this param ready? Param is ready if a valid value was choosen
   */
  ready: boolean;
  /**
   * Dependencies are resolved? Dependencies are resolved if all previous params are ready
   */
  dependenciesResolved: boolean;

  /**
   * Show this param in input field
   */
  active: boolean;
}

export interface APIListItem {
  label: string;
  /**
   * Short description of the api
   */
  url: string;
  /**
   * Short description of the api
   */
  short_desc: string;
  /**
   * If freestyle is true the api url can be entered manually
   */
  freestyle?: boolean;
  /**
   * If role is "shopify-staff-member", then the api can only be used within the app but not from the theme.
   * If roles is empty or undefined the api can be used within the app and the theme.
   */
  roles?: string[];
}

export interface Scope {
  langcode?: string;
  self: Component; // WORKAROUND
  result: string;
  currentParams: APIParam[];
  currentQueries: APIParam[];
  currentUrl: string;
  currentSelectApi: APIListItem;
  send: ShopifyNestApiExplorerComponent["send"];
  apiList: ShopifyNestApiExplorerComponent["apiList"];
  selectApi: ShopifyNestApiExplorerComponent["selectApi"];
  selectFreestyleApi: ShopifyNestApiExplorerComponent["selectFreestyleApi"];
  selectApiParamValue: ShopifyNestApiExplorerComponent["selectApiParamValue"];
  selectApiQueryValue: ShopifyNestApiExplorerComponent["selectApiQueryValue"];
}

export abstract class ShopifyNestApiExplorerComponent extends Component {
  public static tagName = "shopify-nest-api-explorer";

  protected abstract apiList: APIListItem[];

  protected autobind = true;

  protected editor?: monaco.editor.IStandaloneCodeEditor;
  protected localesService = LocalesStaticService.getInstance("main");

  static get observedAttributes() {
    return [];
  }

  protected set result(result: string) {
    this.scope.result = result;
    if (this.editor) {
      this.editor.setValue(this.scope.result);
    } else {
      const el = this.el.querySelector(".monaco-editor") as HTMLElement;
      if (!el) {
        throw new Error(
          "This component needs a container element with the class of .monaco-editor"
        );
      }
      this.editor = monaco.editor.create(el, {
        value: this.scope.result,
        language: "json",
        theme: "vs-dark",
        readOnly: true,
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      });
    }
  }

  protected debug = Debug(
    "component:" + ShopifyNestApiExplorerComponent.tagName
  );

  protected abstract scope: Scope;

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestApiExplorerComponent.observedAttributes);
  }

  public send() {
    this.generateUrlOfParams();

    this.debug("send", this.scope.currentUrl);
    HttpService.getJSON(this.scope.currentUrl)
      .then((result: any) => {
        this.debug("result 2", result);
        this.result = JSON.stringify(result, null, 4);
      })
      .catch((error) => {
        if (typeof error === "object") {
          if (error.responseJSON) {
            this.result = JSON.stringify(error.responseJSON, null, 4);
            return;
          }
          this.result = JSON.stringify(error, null, 4);
          return;
        } else if (typeof error === "string") {
          try {
            this.result = JSON.stringify(error, null, 4);
          } catch (error) {
            this.result = `{${error}}`;
          }
          return;
        }
      });
  }

  public selectFreestyleApi() {
    this.scope.apiList.forEach((api) => {
      if (api.freestyle) {
        this.selectApi(api);
        this.el
          .querySelector<HTMLFormElement>(".form-control-freestyle")
          ?.focus();
        return;
      }
    });
  }

  public selectApi(api: APIListItem) {
    DropdownService.closeAll();
    if (api.freestyle) {
      // Generate the url befor the new api is selected if the user want's to go back to freestyle without losing the current url
      this.generateUrlOfParams();
    }
    this.scope.currentSelectApi = api;
    this.scope.currentParams = this.generateParamsForApi(api);
    this.scope.currentQueries = this.generateQueriesForApi(api);
    this.checkPreviousParamsReady();
    this.loadParamsValues();
    this.loadQueriesValues();
  }

  public selectApiParamValue(
    self: this,
    param: APIParam,
    value: string | number
  ) {
    self.debug("selectApiParamValue", param, value);
    param.value = value;
    param.ready = true;
    self.checkPreviousParamsReady();
    self.loadParamsValues();
    DropdownService.closeAll();
  }

  public selectApiQueryValue(
    self: this,
    query: APIParam,
    value: string | number
  ) {
    self.debug("selectApiQueryValue", query, value);
    query.value = value;
    query.ready = true;
    DropdownService.closeAll();
  }

  protected initLocales() {
    // set avaible langcodes
    this.scope.langcode = this.localesService.getLangcode();
    this.localesService.event.on("changed", (
      changedLangcode: string /*, initial: boolean*/
    ) => {
      // Activate localcode and disable the other
      this.scope.langcode = changedLangcode;
    });
  }

  /**
   * Create url of params if current selected api is not freestyle
   */
  protected generateUrlOfParams() {
    if (!this.scope.currentSelectApi.freestyle && this.scope.currentParams) {
      this.scope.currentUrl = "";
      this.scope.currentParams.forEach((param) => {
        if (param.active) {
          const value = param.value ? param.value : param.original;
          this.scope.currentUrl += "/" + value;
        }
      });
      this.scope.currentQueries.forEach((query /*, i*/) => {
        let activeCounter = 0;
        if (query.active) {
          const value = query.value ? query.value : query.defaultValue;
          this.scope.currentUrl += activeCounter <= 0 ? "?" : "&";
          this.scope.currentUrl += query.name + "=";
          this.scope.currentUrl += value;
          activeCounter++;
        }
      });
    }
  }

  protected generateParamsForApi(api: APIListItem) {
    const queryStartIndex = api.url.indexOf("?");
    const url =
      queryStartIndex < 0 ? api.url : api.url.substring(0, queryStartIndex);
    const params = url.split("/");
    const paramObjs = new Array<APIParam>();
    for (const i in params) {
      if (params[i]) {
        const param = params[i];
        if (param) {
          const isDynamic = param.startsWith(":") || param.startsWith("*");
          const name = param.replace(/(:|\*)/g, "");
          paramObjs.push({
            name,
            original: param,
            value: isDynamic ? undefined : param, // no dynamic params has a static value
            values: [],
            type: "dropdown",
            dynamic: isDynamic,
            ready: !isDynamic, // dynamic params not ready by default, we need to load the values first
            dependenciesResolved: !isDynamic,
            active: true,
          });
        }
      }
    }
    return paramObjs;
  }

  protected generateQueriesForApi(api: APIListItem) {
    const queryStartIndex = api.url.indexOf("?");
    const queryObjs = new Array<APIParam>();
    if (queryStartIndex < 0) {
      return queryObjs;
    }
    const queryString = api.url.substring(queryStartIndex + 1);
    const queries = new URLSearchParams(queryString);
    this.debug("generateQueriesForApi", queries, queryString);
    if (queries) {
      queries.forEach((defaultValue, name) => {
        let type: "text" | "number" | "dropdown" = "dropdown";
        let ready = false;
        let value: string | number | undefined;
        if (defaultValue !== null) {
          if (isNumber(defaultValue)) {
            type = "number";
            value = 0;
            ready = true;
          } else {
            type = "text";
            value = "";
            ready = true;
          }
        }
        queryObjs.push({
          name,
          original: name,
          value,
          defaultValue,
          values: [],
          type,
          dynamic: true,
          ready,
          dependenciesResolved: true,
          active: false,
        });
      });
    }
    return queryObjs;
  }

  /**
   * Check if all previous params are ready,
   * this is required to load the possible values of the current dynamic param
   */
  protected checkPreviousParamsReady() {
    for (let index = 1; index < this.scope.currentParams.length; index++) {
      const param = this.scope.currentParams[index];
      const prevParam = this.scope.currentParams[index - 1];
      param.dependenciesResolved =
        prevParam.ready && prevParam.dependenciesResolved;
    }
    this.debug("checkPreviousParamsReady", this.scope.currentParams);
  }

  protected loadParamsValues() {
    this.scope.currentParams.forEach((param) => {
      if (param.dynamic) {
        this.loadParamValues(param)
          .then((values) => {
            if (values) {
              this.debug(`values for ${param.name}`, values);
              param.values = values;
            } else {
              this.debug("No values found for", param.name);
            }
          })
          .then(() => {
            this.checkPreviousParamsReady();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  protected loadQueriesValues() {
    if (this.scope.currentQueries) {
      this.scope.currentQueries.forEach((currentQuery) => {
        this.loadQueryValues(currentQuery)
          .then((query) => {
            currentQuery = concat(false, currentQuery, query);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
    this.debug("loadQueriesValues", this.scope.currentQueries);
  }

  protected abstract loadParamValues(param: APIParam): Promise<any>;

  protected abstract loadQueryValues(query: APIParam): Promise<APIParam>;

  protected async beforeBind() {
    this.initLocales();
    this.debug("beforeBind");
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
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

  // deconstructor
  protected disconnectedCallback() {
    if (this.editor) {
      this.editor.dispose();
    }
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
