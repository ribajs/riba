import {
  Riba,
  coreModule,
  Utils,
} from '@ribajs/core';
import routerModule from '@ribajs/router';

// import * as CustomBinders from './binders';
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

    this.riba.bind(document.body, window.model);
  }
}

Utils.domIsReady(() => {
  const main = new Main();
});
