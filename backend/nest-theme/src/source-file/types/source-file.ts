import type { Stats } from 'fs';
import type { Script } from 'vm';

export interface SourceFile {
  filename: string;
  path: string;
  source: string;
  script: Script;
  stats: Stats;
}
