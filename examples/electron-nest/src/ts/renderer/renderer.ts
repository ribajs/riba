import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { bs4Module } from "@ribajs/bs4";
import { extrasModule } from "@ribajs/extras";

import * as CustomComponents from "./components";

import { App } from "./interfaces";
declare global {
  interface Window {
    app: App;
  }
}

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);

// Register custom components
riba.module.component.regists(CustomComponents);

ready(async () => {
  riba.bind(document.body, model);
});
