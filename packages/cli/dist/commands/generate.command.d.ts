/// <reference types="debug" />
import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class GenerateCommand extends AbstractCommand {
    debug: import("debug").Debugger;
    load(program: CommanderStatic): void;
    private buildDescription;
    /**
     * Returns a table listing which schematics are available with the generate argument
     * @example
     *  ┌───────────┬───────┐
     *  │ name      │ alias │
     *  │ component │ com   │
     *  │ ...       │ ...   │
     *  └───────────┴───────┘
     */
    private buildSchematicsListAsTable;
}
