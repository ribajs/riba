import { ScopeRootBase } from "./scope-root-base.js";

export interface ScopeBase<R = ScopeRootBase, P = any> {
  /** Global root scope */
  $root?: R;
  $parent?: P;
}
