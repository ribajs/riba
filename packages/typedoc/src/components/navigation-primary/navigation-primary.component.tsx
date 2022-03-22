import { Component, HttpService, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Dropdown } from "@ribajs/bs5";
import { Pjax } from "@ribajs/router";
import childTemplateList from "./child-template-list.html";
import childTemplateDropdown from "./child-template-dropdown.html";

import type { NavigationPrimaryComponentScope, NavigationFlat, JsxTsdNavigationPrimaryProps, Dataset } from "../../types/index.js";

export class NavigationPrimaryComponent extends Component {
  public static tagName = "tsd-navigation-primary";

  static get observedAttributes(): (keyof JsxTsdNavigationPrimaryProps)[] {
    return ["type"];
  }

  protected requiredAttributes(): (keyof JsxTsdNavigationPrimaryProps)[] {
    return ["type"];
  }

  protected routerEvents = new EventDispatcher("main");

  public scope: NavigationPrimaryComponentScope = {
    childTemplateList,
    childTemplateDropdown,
    type: 'list',
    selectedModule: 'Modules',
    onModuleSelect: this.onModuleSelect
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
    await this.fetchData();
  }

  protected async afterBind() {
    await super.afterBind();
    if (this.scope.$root?.dataset) {
      this.setSelectedModule(this.scope.$root?.dataset);
    }
  }

  protected addEventListeners() {
    this.routerEvents.on("newPageReady", this.onNewPage, this);
  }

  protected async onNewPage() {
    console.debug("onNewPage", this.scope, this.scope.selectedModule);
    if (this.scope.$root?.dataset) {
      this.setSelectedModule(this.scope.$root?.dataset);
    }
  }

  public onModuleSelect(mod: NavigationFlat) {
    console.debug("onModuleSelect");
    this.scope.selectedModule = mod.parent?.name || mod.name;
    const pjax = Pjax.getInstance("main");
    if (!pjax || !mod.href) {
      console.warn("No module with href or no pjax instance found!");
      return;
    }
    Dropdown.hideAll();
    pjax.goTo(mod.href);
  }

  protected setSelectedModule(dataset: Dataset) {
    let selectedModule = this.scope.$root?.dataset?.module?.parent?.name || this.scope.$root?.dataset?.module?.name || 'Modules';
    if (selectedModule === dataset.projectName) {
      selectedModule = this.scope.$root?.dataset?.module?.name || 'Modules';
    }
    this.scope.selectedModule = selectedModule;
  }

  protected async fetchData() {
    const data = await HttpService.getJSON<NavigationFlat>("/assets/primary-navigation.json");
    this.scope.primaryNav = data.body;
    console.debug("NavigationPrimaryComponent", this.scope.primaryNav);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (this.scope.type === 'list') {
      return (
        <nav class="tsd-navigation primary" rv-if="data.extern.length | empty">
          <ul>
            <li rv-each-mod="primaryNav" rv-add-class="mod.classNames" rv-route-class-active="mod.href" rv-route-class-parent-active="mod.parent.href" rv-template="childTemplateList"></li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div class="dropdown">
          <button rv-bs5-dropdown="" class="btn btn-outline-primary dropdown-toggle d-flex justify-content-between align-items-center" id="dropdownMenuModules" aria-haspopup="true" aria-expanded="false" >
            <span rv-text="selectedModule">Modules</span> <bs5-icon src="/assets/iconset/svg/arrow_carrot_thin.svg" size={16} direction="down"></bs5-icon>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuModules">
            <li class="dropdown-item cursor-pointer" rv-each-mod="primaryNav" rv-add-class="mod.classNames" rv-route-class-active="mod.href" rv-route-class-parent-active="mod.parent.href" rv-template="childTemplateDropdown" rv-on-click="onModuleSelect | args mod"></li>
          </ul>
        </div>
      );
    }
  }
}
