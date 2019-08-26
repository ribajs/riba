import { tFormatterWrapper } from './t.formatter';
import { ALocalesService } from '../services/locales-base.service';
import { IFormatterWrapper } from '@ribajs/core';

export default (localesService: ALocalesService): IFormatterWrapper[] => {
  return [
    tFormatterWrapper(localesService),
  ];
};
