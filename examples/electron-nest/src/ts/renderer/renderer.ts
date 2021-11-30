import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { bs4Module } from "@ribajs/bs4";
import { extrasModule } from "@ribajs/extras";
import * as CustomComponents from "./components";
import { Config, Env } from "../typings";

declare global {
  const CONFIG: Config;
  const ENV: Env;
}

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(extrasModule.init());

// Register custom components
riba.module.component.regists(CustomComponents);

ready(async () => {
  riba.bind(document.body, model);
});
