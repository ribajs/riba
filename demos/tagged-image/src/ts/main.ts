import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { taggedImageModule } from "@ribajs/tagged-image";
import { TaggedImageDemoModule } from "./taggedimage-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(taggedImageModule);
riba.module.regist(TaggedImageDemoModule);

riba.bind(document.body, model);
