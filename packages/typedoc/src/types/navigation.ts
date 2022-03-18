export interface Navigation {
  name: string;
  href?: string;
  classNames: string;
  children: Navigation[];
}