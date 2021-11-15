import type { PodloveWebPlayerStoreActionType } from "@podlove/types";

export const createAction = (
  type: PodloveWebPlayerStoreActionType,
  payload?: any
) => {
  return {
    type,
    payload,
  };
};

export const selectEpisode = (payload: { index: number; play: boolean }) => {
  return createAction("PLAYER_SELECT_PLAYLIST_ENTRY", payload);
};

export const requestPause = () => {
  return createAction("PLAYER_REQUEST_PAUSE");
};

export const requestPlay = () => {
  return createAction("PLAYER_REQUEST_PLAY");
};
