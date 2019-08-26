import { IRibaModule } from './interfaces';
import * as binders from './binders';
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
  binders,
  services,
};
