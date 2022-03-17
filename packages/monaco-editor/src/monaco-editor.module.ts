import { RibaModule } from "@ribajs/core";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.MonacoEditorService.setSingleton(options);
    return this;
  }
};
