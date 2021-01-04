import { PageComponent } from "../page-component";

export interface PageComponentAfterBindEventData {
  tagName: string;
  component: PageComponent;
  scope: any;
}
