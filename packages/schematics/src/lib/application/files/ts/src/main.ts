import { coreModule, Riba } from '@ribajs/core';
import { <%= classify(name) %>Module } from './<%= name %>.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(<%= classify(name) %>Module);

const bindToElement = document.getElementById('rv-<%= name %>');
riba.bind(bindToElement, model);
