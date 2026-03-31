/// <reference types="vite/client" />

import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { IconsetModule } from "./iconset.module.js";

const iconsetModules = import.meta.glob("@ribajs/iconset/src/svg/*.svg");
const ICONSET = Object.keys(iconsetModules)
  .map((modulePath) => modulePath.split("/").pop()?.replace(".svg", ""))
  .filter((iconName): iconName is string => Boolean(iconName));

const riba = new Riba();
const model = {
  ICONSET,
};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init({}));
riba.module.register(IconsetModule.init());

riba.bind(document.body, model);
