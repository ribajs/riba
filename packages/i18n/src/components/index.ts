export { AI18nSwitcherComponent } from "./abstract-switcher/switcher.abstract.component";
import { i18nSwitcherComponentWrapper } from "./switcher/switcher.component";
import { i18nShareComponentWrapper } from "./share/share.component";
import { ALocalesService } from "../services/locales-base.service";
import { Components } from "@ribajs/core";

export default (localesService: ALocalesService): Components => {
  return {
    I18nSwitcherComponent: i18nSwitcherComponentWrapper(localesService),
    I18nShareComponent: i18nShareComponentWrapper(localesService),
  };
};
