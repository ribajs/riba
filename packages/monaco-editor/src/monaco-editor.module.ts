import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";
import * as binders from "./binders";
import * as services from "./services";

export const monacoEditorModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
};
