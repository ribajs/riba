import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { monacoEditorModule } from "@ribajs/monaco-editor";
import { MonacoDemoModule } from "./monaco-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module);
riba.module.regist(extrasModule);
riba.module.regist(monacoEditorModule);
riba.module.regist(MonacoDemoModule);

riba.bind(document.body, model);
