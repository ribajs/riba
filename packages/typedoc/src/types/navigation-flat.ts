import { Navigation } from "./navigation";

export interface NavigationFlat extends Navigation {
  parent?: {
    name: string;
    href?: string;
    path?: string;
  };
}
