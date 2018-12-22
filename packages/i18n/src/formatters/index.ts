import { tFormatterWrapper } from './t.formatter';
import { ALocalesService } from '../services/locales-base.service';
import { IModuleFormatterWrapper } from '@ribajs/core';

export default (localesService: ALocalesService): IModuleFormatterWrapper[] => {
  return [
    tFormatterWrapper(localesService),
  ];
};
