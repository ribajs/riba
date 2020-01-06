import { Riba, coreModule } from '@ribajs/core';
import { eachItemModule } from './each-item.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(eachItemModule);

const bindToElement = document.getElementById("rv-app");
riba.bind(bindToElement, model);
