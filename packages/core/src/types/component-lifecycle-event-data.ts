import type { Component } from "../component/index.js";

export interface ComponentLifecycleEventData {
  tagName: string;
  component: Component;
  // scope: any;
  // id: string;
}
