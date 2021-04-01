import type { Builder, Index } from 'lunr';
import type { CreateOptions, Builders, Indices } from './types';
export declare class LunrService {
    static lunr: any;
    protected builders: Builders;
    protected indices: Indices;
    create(namespace?: string, options?: CreateOptions): Builder;
    buildIndex(namespace: string): Index;
    getBuilder(namespace: string): Builder;
    getIndex(namespace: string): Index;
}
