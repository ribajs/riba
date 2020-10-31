import { Component, HttpService } from "@ribajs/core";
import template from "./el-version.component.html";

interface Scope {
  versions: {
    electron?: string;
    chrome?: string;
    node?: string;
    riba?: string;
  };
}

export class ElVersionComponent extends Component {
  public static tagName = "el-version";
  public _debug = true;
  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    versions: {},
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ElVersionComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    this.scope.versions = await HttpService.getJSON(`${baseUrl}/versions`);
    this.debug("beforeBind", this.scope);
  }

  // deconstructor
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  protected template() {
    return template;
  }
}
