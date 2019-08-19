import { AbstractRunner, SchematicRunner } from '../runners';
import { AbstractCollection } from './abstract.collection';
import { SchematicOption } from './schematic.option';

export interface Schematic {
  name: string;
  alias: string;
}

export class RibaCollection extends AbstractCollection {
  private static schematics: Schematic[] = [
    { name: 'component', alias: 'com' },
  ];

  constructor(runner: AbstractRunner = new SchematicRunner()) {
    super('./schematics/collection.json', runner);
  }

  public async execute(name: string, options: SchematicOption[]) {
    const schematic: string = this.validate(name);
    await super.execute(schematic, options);
  }

  public static getSchematics(): Schematic[] {
    return RibaCollection.schematics;
  }

  private validate(name: string) {
    const schematic = RibaCollection.schematics.find(
      s => s.name === name || s.alias === name,
    );

    if (schematic === undefined || schematic === null) {
      throw new Error(
        `Invalid schematic "${name}". Please, ensure that "${name}" really exists in this collection.`,
      );
    }
    return schematic.name;
  }
}