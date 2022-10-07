import { coreModule, Riba } from "@ribajs/core";
import { monacoEditorModule } from "@ribajs/monaco-editor";
import { MonacoDemoModule } from "./monaco-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(monacoEditorModule.init());
riba.module.register(MonacoDemoModule.init());

riba.bind(document.body, model);
