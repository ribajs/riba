import { coreModule, Debug, Riba } from '@ribajs/core';
import { <%= classify(name) %>Module } from './<%= name %>.module';

const debug = Debug('main');
const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(<%= classify(name) %>Module);

const bindToElement = document.getElementById('rv-<%= name %>');
debug('bind to', bindToElement);
riba.bind(bindToElement, model);
