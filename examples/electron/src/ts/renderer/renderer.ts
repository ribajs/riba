import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { bs4Module } from "@ribajs/bs4";
import { extrasModule } from "@ribajs/extras";

import * as CustomComponents from "./components";

import { AppApiService } from "./services";

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

  const app = new AppApiService();
  const helloResponse = await app.request("main/hello", "Say hello");
  console.log("api hello response: ", helloResponse);
});
