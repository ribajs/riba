import { PodloveWebPlayerStoreActionType } from "./podlove-web-player-store-action-type";
export interface PodloveWebPlayerStoreAction {
    lastAction: {
        type: PodloveWebPlayerStoreActionType;
        payload?: number;
        "@@redux-saga/SAGA_ACTION"?: boolean;
    };
}
