import { Models } from "shopify-admin-api";
import { Moment } from "moment";

export interface ThemeData extends Models.Theme {
  store: string;
  created_at_moment: Moment;
  updated_at_moment: Moment;
}
