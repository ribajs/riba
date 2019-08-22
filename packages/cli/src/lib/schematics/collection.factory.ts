import { RunnerFactory } from '../runners';
import { SchematicRunner } from '../runners/schematic.runner';
import { AbstractCollection } from './abstract.collection';
import { Runner } from '../../interfaces';
import { CustomCollection } from './custom.collection';
import { RibaCollection } from './riba.collection';
import { defaultConfiguration } from '../configuration/configuration.default';

export class CollectionFactory {
  public static create(collection: string): AbstractCollection {
    switch (collection) {
      case defaultConfiguration.collection:
        return new RibaCollection(RunnerFactory.create(
          Runner.SCHEMATIC,
        ) as SchematicRunner);

      default:
        return new CustomCollection(collection, RunnerFactory.create(
          Runner.SCHEMATIC,
        ) as SchematicRunner);
    }
  }
}
