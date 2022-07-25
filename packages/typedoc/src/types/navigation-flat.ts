import { Navigation } from "./navigation.js";

export interface NavigationFlat extends Navigation {
  parent?: {
    name: string;
    href?: string;
    path?: string;
  };
}
