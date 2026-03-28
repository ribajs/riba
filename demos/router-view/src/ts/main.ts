import { coreModule, Riba } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
import { bs5Module } from "@ribajs/bs5";
import { RouterViewDemoModule } from "./router-view-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(routerModule.init());
riba.module.register(bs5Module.init());
riba.module.register(RouterViewDemoModule.init());

riba.bind(document.body, model);
