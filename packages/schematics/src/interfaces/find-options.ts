import { Path } from '@angular-devkit/core';

export interface IFindOptions {
  name?: string;
  path: Path;
  kind?: string;
  language?: string;
  flat?: boolean;
}
