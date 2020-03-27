import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Debugger } from "debug";
export declare class GenerateCommand extends AbstractCommand {
    protected debug: Debugger;
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
