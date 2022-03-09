import { Formatters } from "./formatters.js";
import { Binders } from "./binders.js";
import { Adapters } from "./adapters.js";
import { Components } from "./components.js";

export interface Extensions {
  binders?: Binders;
  formatters?: Formatters;
  components?: Components;
  adapters?: Adapters;
}
