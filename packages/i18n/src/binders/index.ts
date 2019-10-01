import { i18nStarBinderWrapper } from './i18n/i18n-star.binder';
import { ALocalesService } from '../services/locales-base.service';
import { IBinders } from '@ribajs/core';

export default (localesService: ALocalesService) => {
  return {
    i18nStarBinder: i18nStarBinderWrapper(localesService),
   } as IBinders<any>;
};
