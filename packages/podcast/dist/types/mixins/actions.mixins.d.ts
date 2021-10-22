import type { PodloveWebPlayerStoreActionType } from "../types/podlove-web-player-store-action-type";
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
