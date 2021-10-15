import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";
import * as binders from "./binders";
import * as services from "./services";
import { MonacoEditorModuleOptions } from "./types";

export const monacoEditorModule: RibaModule<MonacoEditorModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  init(options = {}) {
    services.MonacoEditorService.setSingleton(options);
    return this;
  },
};
