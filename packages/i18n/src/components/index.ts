export { AI18nSwitcherComponent } from './abstract-switcher/switcher.abstract.component';
import { i18nSwitcherComponentWrapper } from './switcher/switcher.component';
import { ALocalesService } from '../services/locales-base.service';
import { Components } from '@ribajs/core';

export default (localesService: ALocalesService): Components => {
  return {
    i18nSwitcherComponent: i18nSwitcherComponentWrapper(localesService),
  };
};
