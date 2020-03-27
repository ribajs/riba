import { CommandInput, Configuration } from "../interfaces";
import { AbstractAction } from "./abstract.action";
import { SchematicOption } from "../lib/schematics";
export declare class GenerateAction extends AbstractAction {
    schematicOptions: SchematicOption[];
    constructor();
    handle(inputs: CommandInput[], options: CommandInput[]): Promise<void>;
    protected setDefaults(inputs: CommandInput[], options: CommandInput[]): Promise<CommandInput[]>;
    protected generateFiles(inputs: CommandInput[]): Promise<void>;
    private mapSchematicOptions;
    /**
     * If no path is set and the current directory has not the name of the default directory name, only then set the default path
     * @param inputs
     * @param configuration
     * @param schematicInput
     */
    setPathInput(inputs: CommandInput[], options: CommandInput[], configuration: Configuration, schematicInput: CommandInput): Promise<CommandInput | undefined>;
}
