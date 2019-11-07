import { Configuration, ConfigurationLoader as IConfigurationLoader, Reader } from '../../interfaces';
import {  } from './configuration.loader';
import { defaultConfiguration } from './configuration.default';

export class ConfigurationLoader implements IConfigurationLoader {
  constructor(private readonly reader: Reader) {}

  public async load(): Promise<Configuration> {
    const content: string | undefined = await this.reader.readAnyOf([
      '.riba-cli.json',
      'riba-cli.json',
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
