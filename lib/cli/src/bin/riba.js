#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const commander = __importStar(require("commander"));
const commands_1 = require("../commands");
const bootstrap = () => {
    const program = commander;
    program.version(require('../../package.json').version);
    commands_1.CommandLoader.load(program);
    commander.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
    }
};
bootstrap();
