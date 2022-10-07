import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { IconsetModule } from "./iconset.module.js";

declare global {
  const ICONSET: string[];
}

const riba = new Riba();
const model = {
  ICONSET: ICONSET,
};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init({}));
riba.module.register(IconsetModule.init());

riba.bind(document.body, model);
