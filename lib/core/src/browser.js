"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// Global riba object
const riba = new index_1.Riba();
// regist formatters
riba.module.regist(index_1.coreModule);
window.riba = riba;
exports.default = riba;
