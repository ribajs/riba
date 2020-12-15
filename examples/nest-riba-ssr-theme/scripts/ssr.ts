import { Riba, coreModule } from "@ribajs/core";
// import { ready } from "@ribajs/utils/src/dom";
// import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

// Own
import * as pageComponents from "./pages";
import * as binders from "./binders";
import * as formatters from "./formatters";
// TODO import locales from "../locales";

const model = {};
const riba = new Riba();

// Regist custom components
riba.module.regist({
  components: pageComponents,
  binders,
  formatters,
});

// Regist modules
riba.module.regist(coreModule);
// this.riba.module.regist(i18nModule(this.localesService));

riba.bind(document.body, model);
