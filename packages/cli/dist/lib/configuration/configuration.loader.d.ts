import { Configuration, ConfigurationLoader as IConfigurationLoader, Reader } from "../../interfaces";
export declare class ConfigurationLoader implements IConfigurationLoader {
    private readonly reader;
    constructor(reader: Reader);
    load(): Promise<Configuration>;
}
