import { PodloveWebPlayerStoreActionType } from "./podlove-web-player-store-action-type";
export interface PodloveWebPlayerStoreAction {
    type?: PodloveWebPlayerStoreActionType;
    lastAction?: PodloveWebPlayerStoreActionType;
    payload?: number;
    "@@redux-saga/SAGA_ACTION"?: boolean;
}
