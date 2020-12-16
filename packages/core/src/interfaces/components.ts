import type { BasicComponent, Component } from "../component";
import type { TypeOfComponent } from "./type-of-component";
import type { PageComponent } from "@ribajs/ssr";

export interface Components<T = BasicComponent | Component | PageComponent> {
  [name: string]: TypeOfComponent<T>;
}
