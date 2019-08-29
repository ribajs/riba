"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
classify(name) %  > Module;
from;
'./<%= name %>.module';
const debug = core_1.Debug('main');
const riba = new core_1.Riba();
const model = {};
// Register modules
riba.module.regist(core_1.coreModule);
riba.module.regist(, classify(name) %  > Module);
const bindToElement = document.getElementById("rv-<%= name %>");
debug('bind to', bindToElement);
riba.bind(bindToElement, model);
