import { coreModule, Riba } from "@ribajs/core";
import { emptyTemplateModule } from "@ribajs/empty-template";
import { EmptyTemplateDemoModule } from "./empty-template-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(emptyTemplateModule.init());
riba.module.register(EmptyTemplateDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
