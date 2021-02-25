import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { IconsetModule } from "./iconset.module";

declare global {
  const ICONSET: string[];
}

const riba = new Riba();
const model = {
  ICONSET: ICONSET,
};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module);
riba.module.regist(IconsetModule);

riba.bind(document.body, model);
