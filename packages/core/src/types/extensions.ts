import { Formatters } from "./formatters";
import { Binders, BindersDeprecated } from "./binders";
import { Adapters } from "./adapters";
import { Components } from "./components";

export interface Extensions {
  /** @deprecated */
  bindersDeprecated?: BindersDeprecated;
  binders?: Binders;
  formatters?: Formatters;
  components?: Components;
  adapters?: Adapters;
}
