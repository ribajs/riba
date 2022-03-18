import { Component, TemplateFunction } from "@ribajs/core";
import {  parseType } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

import childTemplate from "./child-template.html";

import type { NavigationPrimaryComponentScope } from "../../types/index.js";

export class NavigationPrimaryComponent extends Component {
  public static tagName = "tsd-navigation-primary";

  static get observedAttributes() {
    return [];
  }

  protected routerEvents = new EventDispatcher("main");

  public scope: NavigationPrimaryComponentScope = {
    childTemplate
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavigationPrimaryComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.addEventListeners();
  }

  protected addEventListeners() {
    this.routerEvents.on("transitionCompleted", this.onNewPage, this);
    this.onNewPage();
  }

  protected onNewPage() {
    const objectTemplateEl = document.getElementById(
      "tsd-navigation-primary-object"
    ) as HTMLTemplateElement | null;
    if (!objectTemplateEl) {
      console.warn("[NavigationPrimaryComponent] No object template found!");
      return;
    }
    const base64 = objectTemplateEl.innerHTML;
    const primaryNav = parseType(base64).value;
    this.scope.primaryNav = primaryNav;
    console.debug("NavigationPrimaryComponent", primaryNav);
  }

  protected template(): ReturnType<TemplateFunction> {
    return (
      <nav class="tsd-navigation primary" rv-if="data.extern.length | empty">
        <ul>
          <li rv-class="primaryNav.classNames">
            <a rv-href="primaryNav.href" rv-text="primaryNav.name"></a>
          </li>
          <div rv-each-mod="primaryNav.intern" rv-template="childTemplate"></div>
          <li rv-if="primaryNav.extern.extern | gt 0" class="label tsd-is-external">
            <span>Externals</span>
          </li>
          <div rv-each-mod="primaryNav.extern" rv-template="childTemplate"></div>
        </ul>
      </nav>
    );
  }
}
