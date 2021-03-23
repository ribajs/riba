import { ComponentLifecycleObject } from "./component-lifecycle-object";
import { ComponentLifecycleState } from "./component-lifecycle-state";

export interface ComponentLifecycleStates extends ComponentLifecycleObject {
  state: ComponentLifecycleState;
}
