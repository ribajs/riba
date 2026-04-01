import type { TransitionData } from "./transition-data.js";

export interface TransitionRules {
  namespace?: string | string[];
  route?: string | string[];
  custom?(data: TransitionData): boolean;
}

export interface TransitionDefinition extends TransitionRules {
  name?: string;
  from?: TransitionRules;
  to?: TransitionRules;
  sync?: boolean;
  priority?: number;
  beforeOnce?(data: TransitionData): Promise<void> | void;
  once?(data: TransitionData): Promise<void> | void;
  afterOnce?(data: TransitionData): Promise<void> | void;
  before?(data: TransitionData): Promise<void> | void;
  beforeLeave?(data: TransitionData): Promise<void> | void;
  leave?(data: TransitionData): Promise<any> | void;
  afterLeave?(data: TransitionData): Promise<void> | void;
  beforeEnter?(data: TransitionData): Promise<void> | void;
  enter?(data: TransitionData): Promise<void> | void;
  afterEnter?(data: TransitionData): Promise<void> | void;
  after?(data: TransitionData): Promise<void> | void;
}
