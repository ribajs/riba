import { Path } from '@angular-devkit/core';

export interface FindOptions {
  name?: string;
  path: Path;
  kind?: string;
  language?: string;
  flat?: boolean;
}
