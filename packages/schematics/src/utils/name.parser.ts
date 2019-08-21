import { basename, dirname, normalize, Path } from '@angular-devkit/core';
import { ILocation, IParseOptions } from '../interfaces';

export class NameParser {
  constructor() {}

  public parse(options: IParseOptions): ILocation {
    const nameWithoutPath: string = basename(options.name as Path);
    const namePath: string = dirname((options.path === undefined
      ? ''
      : options.path
    )
      .concat('/')
      .concat(options.name) as Path);
    return {
      name: nameWithoutPath,
      path: normalize('/'.concat(namePath)),
    };
  }
}
