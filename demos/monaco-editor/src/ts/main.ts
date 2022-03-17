import { coreModule, Riba } from "@ribajs/core";
import { monacoEditorModule } from "@ribajs/monaco-editor";
import { MonacoDemoModule } from "./monaco-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(monacoEditorModule.init());
riba.module.regist(MonacoDemoModule.init());

riba.bind(document.body, model);
