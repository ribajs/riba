/// <reference types="node" />
import type { Stats } from 'fs';
export interface TemplateFile {
    path: string;
    layout: string;
    stats: Stats;
    engine: string;
}
