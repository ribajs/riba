import type { BasicComponent, Component } from "../component";
import type { EventDispatcher } from "../services/event-dispatcher.service";
import type { TypeOf } from "./type-of";
import type { PageComponent } from "@ribajs/ssr";

export interface TypeOfComponent<T = BasicComponent | Component | PageComponent>
  extends TypeOf<T> {
  tagName: string;
  ssrEvents?: EventDispatcher;
}
