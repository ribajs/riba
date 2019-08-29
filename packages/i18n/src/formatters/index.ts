import { tFormatterWrapper } from './t.formatter';
import { ALocalesService } from '../services/locales-base.service';
import { IFormatters } from '@ribajs/core';

export default (localesService: ALocalesService): IFormatters => {
  return {
    ...tFormatterWrapper(localesService),
  };
};
