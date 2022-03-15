import type { BasicComponent, Component } from "../component/index.js";
import type { EventDispatcher } from "@ribajs/events";
import type { ClassOf } from "./class-of.js";
import type { PageComponent } from "@ribajs/ssr/src/index.js";

export interface ClassOfComponent<
  T = BasicComponent | Component | PageComponent,
> extends ClassOf<T> {
  tagName: string;
  ssrEvents?: EventDispatcher;
}
