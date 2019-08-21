#!/usr/bin/env node
import 'source-map-support/register'
import * as commander from 'commander';
import { CommanderStatic } from 'commander';
import { CommandLoader } from '../commands';

declare namespace JSX {
  type Element = any;
}

const bootstrap = () => {
  const program: CommanderStatic = commander;
  program.version(require('../package.json').version);
  CommandLoader.load(program);
  commander.parse(process.argv);

  if (!program.args.length) {
    program.outputHelp();
  }
};

bootstrap();
