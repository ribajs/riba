export type Trigger = HTMLAnchorElement | "popstate" | "barba" | string;

export type RouteData = {
  name?: string;
};

export type UrlData = {
  href: string;
  path: string;
  hash: string;
  query: Record<string, string | string[]>;
};

export interface PageData {
  container?: HTMLElement;
  namespace?: string | null;
  route?: RouteData;
  url: UrlData;
  html?: string;
}

export interface TransitionData {
  current: PageData;
  next: PageData;
  trigger?: Trigger;
  event?: Event;
}
