#!/usr/bin/env node
import "source-map-support/register";
import commander from "commander";
import { CommandLoader } from "../commands";

const bootstrap = () => {
  const program = commander;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  program.version(require("../../package.json").version);
  CommandLoader.load(program);
  commander.parse(process.argv);

  if (!program.args.length) {
    program.outputHelp();
  }
};

bootstrap();
