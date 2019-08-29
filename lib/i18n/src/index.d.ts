import { IRibaModule } from '@ribajs/core';
export * from './binders';
export * from './components';
export * from './formatters';
export * from './interfaces';
export * from './services';
import * as services from './services';
export declare const i18nModule: (localesService: services.ALocalesService) => IRibaModule;
export default i18nModule;
