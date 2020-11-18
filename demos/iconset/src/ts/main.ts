import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { IconsetModule } from "./iconset.module";

declare global {
  const ICONSET: string[];
}

const riba = new Riba();
const model = {
  ICONSET,
};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(IconsetModule);

riba.bind(document.body, model);
