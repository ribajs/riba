import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";
import * as binders from "./binders";
import * as services from "./services";
import { MonacoEditorModuleOptions } from "./types";

export const monacoEditorModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
  init(options: MonacoEditorModuleOptions = {}) {
    services.MonacoEditorService.setSingleton(options);
    return this;
  },
};
