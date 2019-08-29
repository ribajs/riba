import { IConfiguration } from './configuration';
export interface IConfigurationLoader {
    load(): IConfiguration | Promise<IConfiguration>;
}
