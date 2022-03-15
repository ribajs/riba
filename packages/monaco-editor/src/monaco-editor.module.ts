import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as binders from "./binders/index.js";
import * as services from "./services/index.js";
import { MonacoEditorModuleOptions } from "./types/index.js";

export const monacoEditorModule: RibaModule<MonacoEditorModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  init(options = {}) {
    services.MonacoEditorService.setSingleton(options);
    return this;
  }
};
