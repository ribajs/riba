import { coreModule, Riba } from "@ribajs/core";
import { bs5Module } from "@ribajs/bs5";
import { fuseModule } from "@ribajs/fuse";
import { FuseSearchModule } from "./module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init({}));
riba.module.regist(fuseModule.init({}));
riba.module.regist(FuseSearchModule.init());

riba.bind(document.body, model);

console.log("bound");
