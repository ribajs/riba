import { Transition } from './transition';

export interface PjaxOptions {
  id: string;
  wrapper?: HTMLElement;
  containerSelector: string;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  transition: Transition;
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
}
