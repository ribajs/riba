import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs5ThemeExampleModule } from "./bs5-theme-example.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init({}));
riba.module.register(extrasModule.init());
riba.module.register(Bs5ThemeExampleModule.init());

riba.bind(document.body, model);
