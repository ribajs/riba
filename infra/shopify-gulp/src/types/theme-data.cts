import type { Interfaces } from "shopify-admin-api";
import { Moment } from "moment";

export interface ThemeData extends Interfaces.Theme {
  store: string;
  created_at_moment: Moment;
  updated_at_moment: Moment;
}
