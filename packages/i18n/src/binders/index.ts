import { i18nStarBinderWrapper } from "./i18n/i18n-star.binder";
import { ALocalesService } from "../services/locales-base.service";
import { Binders } from "@ribajs/core";

export default (localesService: ALocalesService) => {
  return {
    i18nStarBinder: i18nStarBinderWrapper(localesService),
  } as Binders<any>;
};
