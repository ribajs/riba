"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
/**
 * JQuery Extension for mobile events: https://github.com/benmajor/jQuery-Touch-Events
 */
const _jquery_touch_events_1 = __importDefault(require("./_jquery-touch-events"));
// tslint:disable-next-line:variable-name
const JQuery = _jquery_touch_events_1.default(jquery_1.default);
exports.JQuery = JQuery;
exports.default = JQuery;
