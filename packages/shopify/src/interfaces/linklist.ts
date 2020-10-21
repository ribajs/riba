import { LinklistLink } from "./linklist-link";

export interface Linklist {
  handle: string;
  id: string | null;
  levels: number;
  links: LinklistLink[];
  title: string;
}
