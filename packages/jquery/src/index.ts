import { IRibaModule } from '@ribajs/core';

import * as binders from './binders';

export const i18nModule = (): IRibaModule => {
  return {
    binders,
  };
};

export default i18nModule;
