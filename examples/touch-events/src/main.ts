import { coreModule, Riba } from '@ribajs/core';
import { jqueryModule } from '@ribajs/jquery';
import { TouchEventsModule } from './touch-events.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(jqueryModule);
riba.module.regist(TouchEventsModule);

riba.bind(document.body, model);
