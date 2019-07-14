import {
  Riba,
  coreModule,
} from './index';

// Global riba object
const riba = new Riba();

// regist formatters
riba.module.regist(coreModule);

(window as any).riba = riba;

export default riba;
