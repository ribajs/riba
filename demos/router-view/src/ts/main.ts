import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { routerModule } from "@ribajs/router";
import { bs4Module } from "@ribajs/bs4";
import { RouterViewDemoModule } from "./router-view-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(routerModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(RouterViewDemoModule.init());

riba.bind(document.body, model);
