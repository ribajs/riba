import { Riba, Debug, coreModule } from '@ribajs/core';
import { eachItemModule } from './each-item.module';

const debug = Debug('main');
const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(eachItemModule);

const bindToElement = document.getElementById("rv-app");
debug('bind to', bindToElement);
riba.bind(bindToElement, model);