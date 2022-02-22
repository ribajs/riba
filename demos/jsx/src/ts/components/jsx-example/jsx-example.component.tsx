import { Component, TemplateFunction } from "@ribajs/core";

export class JsxExampleComponent extends Component {
  public static tagName = "jsx-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(JsxExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return (
      <div class="mt-5">
        <bs5-sidebar
          class="bg-tl-primary bg-td-danger text-light d-flex justify-content-center align-items-center"
          id="left-sidebar"
          container-selector="#main-container"
          position="left"
          rv-bs5-co-xs-auto-hide="true"
          rv-bs5-co-xl-auto-hide="false"
          rv-bs5-co-xs-auto-show="false"
          rv-bs5-co-xl-auto-show="true"
          rv-bs5-co-xs-mode="'overlap'"
          rv-bs5-co-xl-mode="'side'"
        >
          <h1>Left</h1>
        </bs5-sidebar>

        <bs5-navbar class="navbar navbar-top fixed-top text-light bg-tl-primary bg-td-danger">
          <div class="container-fluid d-block">
            <div class="row justify-content-start">
              <div class="col-12 d-flex align-items-center justify-content-between">
                {/* Left */}
                <bs5-toggle-button target-id="left-sidebar">
                  <ul class="nav">
                    <li class="nav-item d-flex align-items-center">
                      <bs5-icon
                        src="/iconset/svg/icon_menu.svg"
                        size={32}
                        rv-hide="isActive"
                        rv-on-click="toggle"
                      ></bs5-icon>
                    </li>
                    <li class="nav-item d-flex align-items-center">
                      <bs5-icon
                        src="/iconset/svg/icon_close.svg"
                        size={32}
                        rv-show="isActive"
                        rv-on-click="toggle"
                      ></bs5-icon>
                    </li>
                  </ul>
                </bs5-toggle-button>
                {/* Right */}
                <div class="d-flex flex-row align-items-center">
                  <bs5-theme-button class="mx-3" mode="icon"></bs5-theme-button>
                </div>
              </div>
            </div>
          </div>
        </bs5-navbar>

        <div id="main-container" class="py-5">
          <div class="container-fluid">
            <div class="row">
              <section class="col-12 mb-5 text-center">
                <h1>
                  Switch your OS or this site to
                  <span class="d-tl-none"> Light Mode</span>
                  <span class="d-td-none"> Dark Mode</span>
                </h1>
              </section>
              <section class="col-auto mb-5 mx-auto">
                <button type="button" class="btn btn-primary">
                  Okay
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
