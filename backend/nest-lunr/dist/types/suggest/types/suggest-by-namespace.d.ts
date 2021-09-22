import type { Suggest } from '../suggest';
export interface SuggestByNamespace {
    [name: string]: Suggest;
}
