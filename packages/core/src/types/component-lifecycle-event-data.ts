import type { Component } from "../component/index.js";
import type { ComponentLifecycleOptions } from "./index.js";

export interface ComponentLifecycleEventData {
  tagName: string;
  component: Component;
  options: ComponentLifecycleOptions;
  // scope: any;
  // id: string;
}
