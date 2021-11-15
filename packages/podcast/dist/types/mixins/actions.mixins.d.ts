import type { PodloveWebPlayerStoreActionType } from "@podlove/types";
export declare const createAction: (type: PodloveWebPlayerStoreActionType, payload?: any) => {
    type: PodloveWebPlayerStoreActionType;
    payload: any;
};
export declare const selectEpisode: (payload: {
    index: number;
    play: boolean;
}) => {
    type: PodloveWebPlayerStoreActionType;
    payload: any;
};
export declare const requestPause: () => {
    type: PodloveWebPlayerStoreActionType;
    payload: any;
};
export declare const requestPlay: () => {
    type: PodloveWebPlayerStoreActionType;
    payload: any;
};
