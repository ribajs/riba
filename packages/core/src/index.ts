export * from './interfaces';
export * from './modules';
export * from './services';
export * from './adapter';
export * from './binders';
export * from './components';
export * from './formatters';
export * from './binding';
export * from './parsers';
export * from './riba';
export * from './view';

import { JQuery } from './modules';
import { IRibaModule } from './interfaces';
import { basicBindersWrapper } from './binders';
import {
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,
} from './formatters';
import * as services from './services';

export const coreModule: IRibaModule = {
  formatters: {
    ...specialFormatters,
    ...compareFormatters,
    ...mathFormatters,
    ...stringFormatters,
    ...propertyFormatters,
  },
  binders: basicBindersWrapper(JQuery),
  services,
};
