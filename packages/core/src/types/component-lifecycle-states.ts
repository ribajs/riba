import { ComponentLifecycleObject } from "./component-lifecycle-object.js";
import { ComponentLifecycleState } from "./component-lifecycle-state.js";

export interface ComponentLifecycleStates extends ComponentLifecycleObject {
  state: ComponentLifecycleState;
}
