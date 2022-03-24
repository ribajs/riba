export interface AccordionItem {
  title: string;
  content: string;
  show?: boolean;
  iconDirection?:
    | "left"
    | "left-up"
    | "up"
    | "up-right"
    | "right"
    | "right-down"
    | "down"
    | "down-left";
}
