import type { Store } from "@reduxjs/toolkit";
import { PodloveWebPlayerStoreAction } from "./podlove-web-player-store-action";

export type PodloveWebPlayerStore = Store<{
  lastAction: PodloveWebPlayerStoreAction;
  [name: string]: any; // TODO
}>;
