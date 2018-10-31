import './polyfills';
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
  routerBinders,

  // classes
  EventDispatcher,
  Pjax,
  Prefetch,
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
riba.binderService.regists(routerBinders);

/** Additional global exports */
// (window as any).dispatcher = new EventDispatcher('main');
(window as any).prefetch = new Prefetch();

export default riba;
