import { AbstractRunner, SchematicRunner } from '../runners';
import { AbstractCollection } from './abstract.collection';
import { SchematicOption } from './schematic.option';

export interface Schematic {
  name: string;
  alias: string;
}

export class Collection extends AbstractCollection {
  private static schematics: Schematic[] = [
    { name: 'component', alias: 'com' },
  ];

  constructor(collection: string, runner: AbstractRunner = new SchematicRunner()) {
    super(collection, runner);
  }

  public async execute(name: string, options: SchematicOption[]) {
    await super.execute(name, options);
  }

  public static getSchematics(): Schematic[] {
    return Collection.schematics;
  }

  /**
   * Return the full schematic name by name or alias
   * @param name Name or alias
   */
  public static getSchematic(name: string) {
    const schematic = Collection.schematics.find(
      s => s.name === name || s.alias === name,
    );
    return schematic;
  }
}