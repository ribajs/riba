import { Riba, coreModule } from "@ribajs/core/src/index.js";
import { ready } from "@ribajs/utils/src/dom.js";
import routerModule from "@ribajs/router";

// import * as CustomBinders from "./binders/index.js";
// import * as CustomComponents from './components';

export class Main {
  private riba = new Riba();

  constructor() {
    this.riba.module.regist(coreModule);
    this.riba.module.regist(routerModule);

    // Regist custom components
    // this.riba.module.regist({
    //   components: CustomComponents,
    //   binders: CustomBinders,
    // });

    this.riba.bind(document.body, {});
  }
}

ready(() => {
  new Main();
});
