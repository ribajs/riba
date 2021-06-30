import { coreModule, Riba } from "@ribajs/core";
import { emptyTemplateModule } from "@ribajs/empty-template";
import { EmptyTemplateDemoModule } from "./empty-template-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(emptyTemplateModule);
riba.module.regist(EmptyTemplateDemoModule);

// Bind Riba
riba.bind(document.body, model);
