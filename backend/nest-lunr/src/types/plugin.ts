import type { Builder } from 'lunr';

export type Plugin = (this: Builder, ...args: any[]) => void;
