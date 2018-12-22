import { i18nStarBinderWrapper } from './i18n/i18n-star.binder';
import { ALocalesService } from '../services/locales-base.service';

export default (localesService: ALocalesService) => {
  return [
    i18nStarBinderWrapper(localesService),
  ];
};
