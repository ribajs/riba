import {
  Tinybind,

  // formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,

  // binders
  basicBinders,
  routerBinders,

  // classes
  GlobalEvent,
} from './index';

// Global tinybind object
const tinybind = new Tinybind();

// regist formatters
tinybind.formatterService.regists(compareFormatters);
tinybind.formatterService.regists(mathFormatters);
tinybind.formatterService.regists(propertyFormatters);
tinybind.formatterService.regists(specialFormatters);
tinybind.formatterService.regists(stringFormatters);

// regist binders
tinybind.binderService.regists(basicBinders);
tinybind.binderService.regists(routerBinders);


declare global {
  interface Window {
    globalEvents: GlobalEvent
  }
}

/** Additional global exports */
window.globalEvents = new GlobalEvent();

export default tinybind;