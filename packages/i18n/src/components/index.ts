import I18nSwitcherComponentWrapper from './switcher/switcher.component';
import { ALocalesService } from '../services/locales-base.service';

export default (localesService: ALocalesService) => {
  return {
    I18nSwitcherComponent: I18nSwitcherComponentWrapper(localesService),
  };
};
