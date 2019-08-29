import { IConfiguration, IConfigurationLoader, IReader } from '../../interfaces';
export declare class ConfigurationLoader implements IConfigurationLoader {
    private readonly reader;
    constructor(reader: IReader);
    load(): Promise<IConfiguration>;
}
