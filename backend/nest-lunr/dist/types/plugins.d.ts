import type { Builder } from 'lunr';
export interface Plugin {
    plugin: (this: Builder, ...args: any[]) => void;
    args: any[];
}
