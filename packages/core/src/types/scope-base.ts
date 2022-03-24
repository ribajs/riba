import { ScopeRootBase } from "./scope-root-base.js";

export interface ScopeBase<R = ScopeRootBase> {
  /** Global root scope */
  $root?: R;
}
