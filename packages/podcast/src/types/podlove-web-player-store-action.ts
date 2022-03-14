import { PodloveWebPlayerStoreActionType } from "./podlove-web-player-store-action-type.js";

export interface PodloveWebPlayerStoreAction {
  type?: PodloveWebPlayerStoreActionType;
  lastAction?: PodloveWebPlayerStoreAction;
  payload?: number;
  "@@redux-saga/SAGA_ACTION"?: boolean;
}
