import { coreModule, Riba } from "@ribajs/core";
import { emptyTemplateModule } from "@ribajs/empty-template";
import { EmptyTemplateDemoModule } from "./empty-template-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(emptyTemplateModule.init());
riba.module.regist(EmptyTemplateDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
