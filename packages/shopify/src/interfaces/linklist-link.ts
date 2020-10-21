export interface LinklistLink {
  active: boolean;
  child_active: boolean;
  handle: string;
  level: number;
  levels: number;
  links: LinklistLink[];
  title: string;
  type: string;
  url: string;

  // custom
  collapseable?: boolean;
  collapsed?: boolean;
}
