import { Component, HttpService, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Dropdown } from "@ribajs/bs5";
import { Pjax } from "@ribajs/router";
import type {} from "@ribajs/fuse";
import childTemplateList from "./child-template-list.html?raw";
import childTemplateDropdown from "./child-template-dropdown.html?raw";

import type {
  NavigationPrimaryComponentScope,
  NavigationFlat,
  JsxTsdNavigationPrimaryProps,
  Dataset,
} from "../../types/index.js";

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
    type: "list",
    selectedModule: "Modules",
    onModuleSelect: this.onModuleSelect,
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
    let selectedModule =
      this.scope.$root?.dataset?.module?.parent?.name ||
      this.scope.$root?.dataset?.module?.name ||
      "Modules";
    if (selectedModule === dataset.projectName) {
      selectedModule = this.scope.$root?.dataset?.module?.name || "Modules";
    }
    this.scope.selectedModule = selectedModule;
  }

  protected async fetchData() {
    const data = await HttpService.getJSON<NavigationFlat>(
      "/assets/primary-navigation.json"
    );
    this.scope.primaryNav = data.body;
    console.debug("NavigationPrimaryComponent", this.scope.primaryNav);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (this.scope.type === "list") {
      return (
        <nav class="tsd-navigation primary" rv-if="data.extern.length | empty">
          <ul>
            <li
              rv-each-mod="primaryNav"
              rv-add-class="mod.classNames"
              rv-route-class-active="mod.href"
              rv-route-class-parent-active="mod.parent.href"
              rv-template="childTemplateList"
            ></li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div class="dropdown">
          <button
            rv-bs5-dropdown=""
            class="btn btn-outline-primary dropdown-toggle d-flex justify-content-between align-items-center"
            id="dropdownMenuModules"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span rv-text="selectedModule">Modules</span>{" "}
            <bs5-icon
              src="/assets/iconset/svg/arrow_carrot_thin.svg"
              size={16}
              direction="down"
            ></bs5-icon>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuModules">
            <fuse-search
              rv-parent
              rv-co-items="primaryNav"
              options="{'keys': ['name', 'parent.name']}"
            >
              <div class="mx-2 mb-2">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Filter..."
                  aria-label="Filter"
                  rv-value="searchPattern"
                  rv-on-input="search"
                  rv-on-cut="search"
                  rv-on-paste="search"
                />
              </div>
              <div class="scrollbar-y-scroll scrollbar-primary">
                <div class="dropdown-header">Modules</div>
                <div rv-show="searchPattern | size" rv-each-result="results">
                  <div
                    class="dropdown-item cursor-pointer"
                    rv-add-class="result.item.classNames"
                    rv-route-class-active="result.item.href"
                    rv-route-class-parent-active="result.item.parent.href"
                    rv-on-click="$parent.$parent.onModuleSelect | args result.item"
                  >
                    <a
                      rv-href="result.item.href"
                      rv-text="result.item.parent.name"
                    ></a>
                  </div>
                </div>
                <div
                  rv-if="results | size | eq 0"
                  rv-show="searchPattern | size"
                >
                  <div class="dropdown-item">No result</div>
                </div>
                <div rv-hide="searchPattern | size" rv-each-item="items">
                  <div
                    class="dropdown-item cursor-pointer"
                    rv-add-class="item.classNames"
                    rv-route-class-active="item.href"
                    rv-route-class-parent-active="item.parent.href"
                    rv-on-click="$parent.$parent.onModuleSelect | args item"
                  >
                    <a rv-href="item.href" rv-text="item.parent.name"></a>
                  </div>
                </div>
              </div>
            </fuse-search>
          </div>
        </div>
      );
    }
  }
}
