import { IConfiguration, IConfigurationLoader, IReader } from '../../interfaces';
import {  } from './configuration.loader';
import { defaultConfiguration } from './defaults';

export class ConfigurationLoader implements IConfigurationLoader {
  constructor(private readonly reader: IReader) {}

  public async load(): Promise<IConfiguration> {
    const content: string | undefined = await this.reader.readAnyOf([
      '.nestcli.json',
      '.nest-cli.json',
      'nest-cli.json',
      'nest.json',
    ]);
    if (!content) {
      return defaultConfiguration;
    }
    return {
      ...defaultConfiguration,
      ...JSON.parse(content),
    };
  }
}
