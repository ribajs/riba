import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { monacoEditorModule } from "@ribajs/monaco-editor";
import { MonacoDemoModule } from "./monaco-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(monacoEditorModule.init());
riba.module.regist(MonacoDemoModule.init());

riba.bind(document.body, model);
