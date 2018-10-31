import './modules/polyfills.module';
import JQuery from 'jquery';

import {
  Riba,

  // formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,

  // binders
  basicBindersWrapper,

} from './index';

// Global riba object
const riba = new Riba();

// regist formatters
riba.formatterService.regists(compareFormatters);
riba.formatterService.regists(mathFormatters);
riba.formatterService.regists(propertyFormatters);
riba.formatterService.regists(specialFormatters);
riba.formatterService.regists(stringFormatters);

// regist binders
riba.binderService.regists(basicBindersWrapper(JQuery));

export default riba;
