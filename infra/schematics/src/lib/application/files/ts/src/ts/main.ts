import { coreModule, Riba } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import { <%= classify(name) %>Module } from './<%= name %>.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(<%= classify(name) %>Module);

ready(() => {
  const bindToElement = document.getElementById('rv-<%= name %>');
  if (bindToElement !== null) {
    riba.bind(bindToElement, model);
  } else {
    console.warn(new Error('No element with id "rv-<%= name %>" found! Use body as fallback.'));
    riba.bind(document.body, model);
  }
});
