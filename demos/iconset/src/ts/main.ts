import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { IconsetModule } from "./iconset.module";

declare global {
  const ICONSET: string[];
}

const riba = new Riba();
const model = {
  ICONSET: ICONSET
};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init({}));
riba.module.regist(IconsetModule.init());

riba.bind(document.body, model);
