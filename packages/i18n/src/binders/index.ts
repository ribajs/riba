import { i18nStarBinderCreator } from "./i18n/i18n-star.binder";
import { BindersCreator } from "@ribajs/core";
import { I18nModuleOptions } from "../types";

export const binders: BindersCreator<string> = (options: I18nModuleOptions) => {
  return {
    i18nStarBinder: i18nStarBinderCreator(options),
  };
};

export default binders;
