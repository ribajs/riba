import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { extrasModule } from "@ribajs/extras";
import { BS4ToggleButtonSidebarModule } from "./bs4-toggle-button-sidebar.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(BS4ToggleButtonSidebarModule.init());

riba.bind(document.body, model);
