import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { BS4ToggleButtonSidebarModule } from "./bs4-toggle-button-sidebar.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(BS4ToggleButtonSidebarModule);

riba.bind(document.body, model);
