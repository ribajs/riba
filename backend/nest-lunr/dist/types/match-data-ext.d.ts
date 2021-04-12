import type { MatchData } from 'lunr';
export interface MatchDataExt extends MatchData {
    metadata: {
        [term: string]: {
            [prop: string]: {
                position: number[][];
            };
        };
    };
}
