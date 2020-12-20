import { coreModule, Riba } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
import { bs4Module } from "@ribajs/bs4";
import { RouterViewDemoModule } from "./router-view-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(routerModule);
riba.module.regist(bs4Module);
riba.module.regist(RouterViewDemoModule);

riba.bind(document.body, model);
