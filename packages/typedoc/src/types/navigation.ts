export interface Navigation {
  name: string;
  href?: string;
  path?: string;
  classNames: string;
  children: Navigation[];
  isExtern: boolean;
  isIntern: boolean;
}