import { i18nSwitcherComponentWrapper } from "./switcher/switcher.component";
import { i18nShareComponentWrapper } from "./share/share.component";
import { I18nModuleOptions } from "../types";
import { Components, ComponentsCreator } from "@ribajs/core";

export const components: ComponentsCreator = (
  options: I18nModuleOptions
): Components => {
  return {
    I18nSwitcherComponent: i18nSwitcherComponentWrapper(options),
    I18nShareComponent: i18nShareComponentWrapper(options),
  };
};

export default components;
