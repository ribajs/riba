import type { ScopeBase } from "@ribajs/core"
import type { Dataset } from "./index.js"

export interface NavigationSecondaryComponentScope extends ScopeBase<{dataset: Dataset}> {
  template?: string;
}
